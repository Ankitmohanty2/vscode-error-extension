$sig = '[DllImport("winmm.dll")] public static extern int mciSendStringA(string cmd, System.Text.StringBuilder ret, int retLen, IntPtr hwnd);'
$mci = Add-Type -MemberDefinition $sig -Name "MCI$(Get-Random)" -Namespace Win32 -PassThru
$id = "snd$(Get-Random)"
$file = $args[0]
$mci::mciSendStringA("open `"$file`" alias $id", $null, 0, [IntPtr]::Zero)
$mci::mciSendStringA("play $id wait", $null, 0, [IntPtr]::Zero)
$mci::mciSendStringA("close $id", $null, 0, [IntPtr]::Zero)
