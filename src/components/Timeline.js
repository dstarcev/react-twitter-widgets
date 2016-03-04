import React from 'react'
import AbstractWidget from './AbstractWidget'
import isEqual from 'lodash.isequal'
import cloneDeep from 'lodash.clonedeep'

export default class Timeline extends React.Component {
  static propTypes = {
    widgetId: React.PropTypes.string.isRequired,
    options: React.PropTypes.object
  };

  static defaultProps = {
    options: {}
  };

  shouldComponentUpdate(nextProps) {
    const changed = name => !isEqual(this.props[name], nextProps[name])
    return changed('widgetId') || changed('options')
  }

  ready(tw, element, done) {
    const { widgetId, options } = this.props

    // Options must be cloned since Twitter Widgets modifies it directly
    tw.widgets.createTimeline(widgetId, element, cloneDeep(options))
    .then(() => {
      // Widget is loaded
      done()
    })
  }

  render() {
    return <AbstractWidget ready={::this.ready} />
  }
}
