Set wmp = CreateObject("WMPlayer.OCX")
wmp.URL = WScript.Arguments(0)
wmp.controls.play
While wmp.playState <> 1 And wmp.playState <> 8
    WScript.Sleep 50
Wend