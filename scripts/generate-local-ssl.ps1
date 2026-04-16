# One-time self-signed certs for docker-compose.prod.yml (paths match nginx.conf).
# Uses host openssl if available; otherwise Docker (alpine/openssl). Run from repo root:
#   powershell -ExecutionPolicy Bypass -File .\scripts\generate-local-ssl.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$certDir = Join-Path $root "ssl\certbot\conf\live\javierpardofernandez.com-0001"
New-Item -ItemType Directory -Force -Path $certDir | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $root "ssl\certbot\data") | Out-Null

function Invoke-DockerOpenssl {
    $mount = (Resolve-Path $certDir).Path + ":/certs"
    docker run --rm -v $mount alpine/openssl req -x509 -nodes -days 825 -newkey rsa:2048 `
        -keyout /certs/privkey.pem -out /certs/fullchain.pem `
        -subj "/CN=javierpardofernandez.com" `
        -addext "subjectAltName=DNS:javierpardofernandez.com,DNS:www.javierpardofernandez.com,DNS:localhost"
}

if (Get-Command openssl -ErrorAction SilentlyContinue) {
    $configPath = Join-Path $env:TEMP "openssl-local-jpf.conf"
    @'
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
x509_extensions = v3_req

[dn]
CN = javierpardofernandez.com

[v3_req]
subjectAltName = @san

[san]
DNS.1 = javierpardofernandez.com
DNS.2 = www.javierpardofernandez.com
DNS.3 = localhost
'@ | Set-Content -Path $configPath -Encoding ascii
    try {
        & openssl req -x509 -nodes -days 825 -newkey rsa:2048 `
            -keyout (Join-Path $certDir "privkey.pem") `
            -out (Join-Path $certDir "fullchain.pem") `
            -config $configPath -extensions v3_req
    } finally {
        Remove-Item $configPath -Force -ErrorAction SilentlyContinue
    }
} elseif (Get-Command docker -ErrorAction SilentlyContinue) {
    Invoke-DockerOpenssl
} else {
    Write-Error "Install OpenSSL (e.g. Git for Windows) or Docker, then run this script again."
}

Write-Host "OK: fullchain.pem and privkey.pem in $certDir"
