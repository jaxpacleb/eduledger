import requests
import json
from rich.console import Console
from rich.json import JSON
from rich.theme import Theme

# Gumawa ng custom color theme
custom_theme = Theme({
    "json.str": "green",     # Kulay green ang string values
    "json.number": "cyan",   # Kulay cyan ang number values
    "json.key": "bold white" # Kulay white ang keys para malinaw
})

console = Console(theme=custom_theme)

baseUrl = {    
           {
    "dog": "https://api.thedogapi.com/",
    "api-key": "live_gtyw4TXXjgOG7n5SOHHx7vyDoFXVlLm0TBsfecgh8AsvvQIbGUbbaaaR4AknKHBD"
     }
           }


    # "randomUser": "https://randomuser.me/api/"

print(baseUrl[0]["api-key"])

# headers = {
#     "x-api-key": ""
# }
# url ='https://api.thedogapi.com/v1/breeds'

# res = requests.get(url, headers=headers)

# data = res.json()
# structuredData = json.dumps(data, indent=4)
# console.print(JSON(structuredData))
