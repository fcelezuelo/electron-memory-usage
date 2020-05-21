// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

container = document.querySelector('#memory');

setInterval(() => {
    container.innerHTML = funcsNodeOs()
}, 1000);

function funcsNodeOs() {
    const { cpus, freemem, totalmem, homedir, hostname, uptime } = require('os');

    const memoryTotal = JSON.parse(formatMemory(totalmem(), 'GB'));
    const memoryFree = JSON.parse(formatMemory(freemem(), 'GB'));

    const memory = {
        total: `${memoryTotal.value} ${memoryTotal.unit}`,
        used: `${(memoryTotal.value - memoryFree.value).toFixed(2)} ${memoryFree.unit}`,
        free: `${memoryFree.value} ${memoryFree.unit}`,
        freeOnlyNumber: `${memoryFree.value}`,
        totalOnlyNumber: `${memoryTotal.value}`
    }

    // console.log(formatSeconds(uptime()));
    // console.table(memory);
    // console.table(cpus());

    return createTable(memory);
}

function formatMemory(value, type) {
    type = type.toUpperCase();
    switch (type) {
        case 'MB':
            return `{"value":${(value / Math.pow(1024, 2)).toFixed(2)},"unit":"${type}"}`;
        case 'GB':
            return `{"value":${(value / Math.pow(1024, 3)).toFixed(2)},"unit":"${type}"}`;
        default: return ''
    }
}

function createTable(memory) {
    const colors = {
        red: '#ff0000',
        green: '#4F983C',
        orange: '#ffa54f',
        white: '#FFFFFF'
    }
    let td = '';
    const total = memory.totalOnlyNumber;
    const free = memory.freeOnlyNumber;
    const used = total - free;

    if (free >= total * 0.5) {
        td = `<td style="color:${colors.white}; background: ${colors.green}">`
    } else if(free < (total * 0.5) && free >= (total * 0.15)){
        td = `<td style="color:${colors.white}; background: ${colors.orange}">`
    }else{
        td = `<td style="color:${colors.white}; background: ${colors.red}">`
    }

    return `
        <label>Memória RAM</label>
        <table class="table-striped">
            <thead>
                <tr>
                <th>Total</th>
                <th>Em uso</th>
                <th>Disponível</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>${memory.total}</td>
                <td>${memory.used}</td>
                ${td}${memory.free}</td>
                </tr>
            </tbody>
        </table>`;
}

function formatSeconds(time, type) {
    switch (type) {
        case 'm':
            return `${(time / 60).toFixed(0)} Minutos`;
        case 'h':
            return `${(time / 60 / 60).toFixed(0)} Horas`;
        default: return ''
    }
}