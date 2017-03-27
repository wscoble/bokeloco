import 'ace-css/css/ace.css'
import 'font-awesome/css/font-awesome.css'

// Require index.html so it gets copied to dist
import './index.html'

import Elm from './src/App.elm'

const mountNode = document.getElementById('main')

const app = Elm.Main.embed(mountNode)
