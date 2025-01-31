# Download the latest release

!!! tip ""
    [*Click here*](/docs/getting-started/introduction/#installation) to read the installation guide.

<a href="https://github.com/jean-emmanuel/open-stage-control/releases/latest"> Open Stage Control <span id="osc-version"span></a>

<div id="osc-assets">Loading assets...</div>

<script>

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', 'https://api.github.com/repos/jean-emmanuel/open-stage-control/releases/latest')
oReq.send()


function text(id,  str) {
    var el = typeof id === 'string' ? document.getElementById(id) : id
    el.textContent = str
}

var names = {
    'amd64': 'GNU/Linux Debian (64-bit)',
    'linux-x64': 'GNU/Linux (64-bit)',
    'node': 'Node.js',
    'osx': 'MacOS',
    'win32-x64': 'Windows (64-bit)'
}

function reqListener () {

    var data = JSON.parse(this.responseText)
    var date = new Date(data.published_at)

    text('osc-version', data.tag_name + ' (' + date.toLocaleDateString() + ')')

    var list = document.createElement('ul')
    for (var i in data.assets) {
        var item = document.createElement('li'),
            link = document.createElement('a'),
            name = data.assets[i].name

        try {
            name = names[name.match(/[0-9]+\.[0-9]+\.[0-9]+\-([^\.]+)/)[1]]
        } catch(e) {
            console.log(e)
        }

        link.innerHTML = '<i class="fa fa-download"></i> ' + name + ' <span class="download-size">(' +  (data.assets[i].size / 1024 / 1024).toFixed(0) + 'M)</span>'
        link.href = data.assets[i].browser_download_url

        item.appendChild(link)
        list.appendChild(item)
    }
    var assets = document.getElementById('osc-assets')
    assets.innerHTML = ''
    assets.appendChild(list)


}

</script>


<style>
html {
    overflow-y: scroll
}
.md-sidebar--secondary {
  display: none;
}
@media screen and (min-width: 76.25em) {
    .md-sidebar--primary {
      display: none;
    }
}
.md-content {
    margin: 0;
}
.md-content__inner {
    margin-left: .8rem;
    margin-right: .6rem;
}
li {
    list-style: none;
}
li i {
    margin-right: 10px
}
.download-size {
    color: var(--md-typeset-color);
    opacity: 0.5;
}
</style>

<div>
<a
  href="https://openstagecontrol.ammd.net/docs/changelog/"
  class="md-button md-button-small"
>
  Read the Changelog
</a>
<a
  href="https://www.patreon.com/openstagecontrol?fan_landing=true"
  class="md-button md-button-small patreon-icon"
>
  Support on Patreon
</a></div>
