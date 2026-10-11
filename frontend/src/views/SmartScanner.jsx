import { useEffect, useRef, useState } from "react";
import { recognize } from "tesseract.js";


export default function SmartScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scannerRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [straightenedImg, setStraightenedImg] = useState(null);
  const [extractedData, setExtractedData] = useState("");

  useEffect(() => {
    // 1. Gamitin ang window.jscanify mula sa index.html script
    if (window.jscanify) {
      scannerRef.current = new window.jscanify();
    } else {
      console.warn("Nilo-load pa ang jscanify script...");
    }

    // 2. Real-time corner detection loop
    const detectLoop = () => {
      if (!videoRef.current || !canvasRef.current || !scannerRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        animationFrameRef.current = requestAnimationFrame(detectLoop);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      try {
        const paperContour = scannerRef.current.findPaperContour(video);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (paperContour) {
          scannerRef.current.drawPaperContour(canvas, paperContour, {
            color: "#00FF00",
            thickness: 4,
          });
        }
      } catch (err) {
        // Hayaang lumipas kung naglo-load pa ang OpenCV
      }

      animationFrameRef.current = requestAnimationFrame(detectLoop);
    };

    // 3. Pagbukas ng Camera
    const startLiveScan = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            detectLoop();
          };
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    startLiveScan();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // 4. Capture at Auto-Straighten
  const handleCaptureAndStraighten = () => {
    if (!videoRef.current || !scannerRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const video = videoRef.current;
    const resultCanvas = scannerRef.current.extractPaper(video);
    const straightenedDataUrl = resultCanvas.toDataURL("image/jpeg");
    setStraightenedImg(straightenedDataUrl);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
  };

  // 5. OCR Text Extraction
  const handleExtractText = async () => {
    if (!straightenedImg) return;
    setIsLoading(true);

    try {
      const result = await recognize(straightenedImg, "eng");
      setExtractedData(result.data.text);
    } catch (error) {
      console.error("OCR Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto flex flex-col items-center gap-4">
      <h1 className="text-lg font-bold">Smart Doc Scanner</h1>

      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        {!straightenedImg ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          </>
        ) : (
          <img
            src={straightenedImg}
            alt="Straightened Doc"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="flex gap-2">
        {!straightenedImg ? (
          <button
            onClick={handleCaptureAndStraighten}
            className="px-5 py-2 bg-green-600 text-white rounded-lg"
          >
            I-Scan at Ituwid
          </button>
        ) : (
          <>
            <button
              onClick={handleExtractText}
              disabled={isLoading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Binabasa pa..." : "I-extract ang Data"}
            </button>
            <button
              onClick={() => {
                setStraightenedImg(null);
                setExtractedData("");
                window.location.reload();
              }}
              className="px-5 py-2 bg-zinc-600 text-white rounded-lg"
            >
              Ulitin
            </button>
          </>
        )}
      </div>

      {extractedData && (
        <div className="w-full p-3 bg-gray-100 border rounded-lg max-h-48 overflow-y-auto">
          <h2 className="font-semibold text-sm">Nabasang Datos:</h2>
          <pre className="text-xs whitespace-pre-wrap">{extractedData}</pre>
        </div>
      )}
    </div>
  );
}