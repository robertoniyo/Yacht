$ErrorActionPreference = 'Stop'

$version = '2.45.2'
$releaseTag = 'v2.45.2.windows.1'
$zipUrl = "https://github.com/git-for-windows/git/releases/download/$releaseTag/MinGit-$version-64-bit.zip"

$projectRoot = Convert-Path (Join-Path (Get-Location) '.')
$toolsDir = Join-Path $projectRoot '.git-tools'
$mingitDir = Join-Path $toolsDir 'mingit'
$zipPath = Join-Path $env:TEMP 'mingit.zip'

Write-Host "Downloading MinGit $version ..."
Invoke-WebRequest -Uri $zipUrl -OutFile $zipPath

Write-Host "Extracting to $mingitDir ..."
New-Item -ItemType Directory -Force -Path $mingitDir | Out-Null
Expand-Archive -Path $zipPath -DestinationPath $mingitDir -Force
Remove-Item $zipPath -Force

$gitExe = Join-Path $mingitDir 'cmd/git.exe'
if (-Not (Test-Path $gitExe)) {
  Write-Error "git.exe not found at $gitExe"
  exit 1
}

Write-Host "Portable Git installed at: $gitExe"
Write-Output $gitExe
