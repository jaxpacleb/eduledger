import { useRef, useState } from 'react';

export default function DocumentScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // 1. Buksan ang Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        // "environment" ay nagbubukas ng back camera sa smartphones (mainam pang-scan)
        video: { facingMode: { ideal: 'user' }, width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: {max: 60}},
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraActive(true);
      setCapturedImage(null);
    } catch (err) {
      console.error('Camera error:', err);
      alert('Hindi ma-access ang camera. Siguraduhing binigyan ng pahintulot ang browser.');
    }
  };

  // 2. Kumuha ng Litrato (Capture Snapshot)
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // Itugma ang sukat ng canvas sa totoong resolution ng video stream
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // Iguhit ang frame mula sa video papunta sa canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);

    // I-convert ang iginuhit na frame bilang image string (JPEG)
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(imageDataUrl);

    // Isara ang camera para makatipid sa baterya matapos mag-capture
    stopCamera();
  };

  // 3. Patayin ang Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // 4. Retake Photo
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-lg mx-auto">
      {/* Hidden Canvas - ginagamit lang sa background processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Viewport o Captured Result */}
      <div className="relative w-full aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center">
        {capturedImage ? (
          <img
            src={capturedImage}
            alt="Captured document"
            className="w-full h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${!isCameraActive ? 'hidden' : ''}`}
          />
        )}

        {!isCameraActive && !capturedImage && (
          <p className="text-zinc-400 text-sm">Naka-off ang camera</p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        {!isCameraActive && !capturedImage && (
          <button
            onClick={startCamera}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Buksan ang Camera
          </button>
        )}

        {isCameraActive && (
          <>
            <button
              onClick={capturePhoto}
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              Kuhanan ng Litrato
            </button>
            <button
              onClick={stopCamera}
              className="px-5 py-2.5 rounded-lg bg-zinc-600 hover:bg-zinc-700 text-white font-medium"
            >
              Kanselahin
            </button>
          </>
        )}

        {capturedImage && (
          <button
            onClick={handleRetake}
            className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium"
          >
            Kunan Muli (Retake)
          </button>
        )}
      </div>
    </div>
  );
}