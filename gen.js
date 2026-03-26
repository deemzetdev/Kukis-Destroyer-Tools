const axios = require('axios');
const fs = require('fs');
const colors = require('colors');

const sources = [
    "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all",
    "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=10000&country=all",
    "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000&country=all",
    "https://www.proxyscan.io/download?type=http",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks4.txt",
    "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/socks5.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
    "https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt"
];

async function scrapeProxy() {
    console.log(`[!] Lagi nyolong proxy live buat lu, sabar Memek...`.yellow);
    let allProxies = [];

    for (const url of sources) {
        try {
            const res = await axios.get(url);
            const proxies = res.data.split(/\r?\n/);
            allProxies = allProxies.concat(proxies);
            console.log(`[+] Dapet ${proxies.length} dari source: ${url.substring(0, 30)}...`.green);
        } catch (e) {
            console.log(`[-] Source error, biarin aja: ${url.substring(0, 30)}...`.red);
        }
    }

    const uniqueProxies = [...new Set(allProxies)].filter(p => p.includes(':'));
    fs.writeFileSync('proxy.txt', uniqueProxies.join('\n'));

    console.log(`\n[!] TOTAL: ${uniqueProxies.length} Proxy Live disimpan ke proxy.txt!`.cyan);
    console.log(`[!] Sekarang lu bisa bantai target pake /attack, Anjing!`.magenta);
}

scrapeProxy();