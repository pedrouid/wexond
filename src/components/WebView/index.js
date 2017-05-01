import React from 'react'
import BrowserStorage from '../../classes/BrowserStorage'

export default class WebView extends React.Component {
  componentDidMount () {
    const self = this

    let checkWebcontentsInterval = setInterval(function () {
      if (self.getWebView().getWebContents() != null) {
        const event = new Event('webcontents-load')
        self.getWebView().dispatchEvent(event)
        clearInterval(checkWebcontentsInterval)
      }
    }, 1)

    this.getWebView().addEventListener('load-commit', function () {
      // TODO: Refresh navigation icons in Menu.
      const app = self.props.getApp()
      const tabs = app.getTabs()
      const page = self.props.getPage()

      let contains = false

      // Check if the url from webview is in excluded URLs.
      for (var i = 0; i < global.excludedURLs.length; i++) {
        if (global.excludedURLs[i].indexOf(this.getURL()) !== -1) {
          contains = true
          break
        }
        if (this.getURL().indexOf(global.excludedURLs[i]) !== -1) {
          contains = true
          break
        }
      }

      // If not, show the tabbar.
      if (!contains) {
        page.setState({height: 'calc(100vh - ' + global.systembarHeight + 'px'})
        tabs.setState({tabsVisible: true})
      }
    })

    this.getWebView().addEventListener('did-finish-load', function () {
      var webview = self.getWebView()
      // Check if tab is selected.
      if (self.props.getTab() != null && self.props.getTab().selected) {
        self.props.getApp().updateBarText(webview.getURL())
      }
      // Add history item.
      BrowserStorage.addHistoryItem(webview.getTitle(), webview.getURL())
    })

    this.getWebView().addEventListener('ipc-message', function (e) {
      if (e.channel === 'webview:mouse-left-button') {
        // hide bar on webview click
        var bar = self.props.getApp().getBar()
        if (!bar.locked) {
          bar.hide()
        }

        self.props.getApp().refs.menu.hide()
      }
    })

    this.getWebView().addEventListener('page-title-updated', function (e) {
      self.props.getTab().setState({title: e.title})
    })

    this.getWebView().addEventListener('page-favicon-updated', function (e) {
      self.props.getTab().setState({favicon: e.favicons[0]})
    })
  }

  /**
   * Gets webview tag.
   * @return {<webview>}
   */
  getWebView = () => {
    return this.refs.webview
  }

  render () {
    return (
      <webview ref='webview' preload='../../preloads/Global' is autosize class='webview' src={this.props.src} />
    )
  }
}