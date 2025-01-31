var terminal = require('./terminal'),
    settings = require('./settings'),
    html = require('nanohtml'),
    semver = require('semver')

require('./toolbar')

DOM.get(document, '#osc-greeting-header')[0].appendChild(html`${window.PACKAGE.productName} <span class="version">v${window.PACKAGE.version}</span>`)

if (settings.remote.read('checkForUpdates') && navigator.onLine) {

    var request = new XMLHttpRequest()
    request.open('GET', 'https://api.github.com/repos/jean-emmanuel/open-stage-control/tags', true)

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText),
                current = 'v' + window.PACKAGE.version,
                latest = data[0].name

            if (semver.gt(latest, current)) {
                terminal.log(`(INFO) A new version is available : <a target="_blank" href="https://github.com/jean-emmanuel/open-stage-control/releases">${latest}</a>`, 'info')
            } else if (semver.gt(current, latest)) {
                terminal.log(`(WARNING) Using development version ${current}`, 'warning')
            }

        }
    }

    request.send()

}

if (settings.remote.read('alwaysOnTop')) {
    
    remote.getCurrentWindow().setAlwaysOnTop(true)

}
