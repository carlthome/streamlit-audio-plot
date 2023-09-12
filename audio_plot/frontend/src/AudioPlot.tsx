import {
  ArrowTable,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode, createRef } from "react"
import Plot from 'react-plotly.js'
// import ReactAudioPlayer from 'react-audio-player'

interface State {

}

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class AudioPlot extends StreamlitComponentBase<State> {
  private audioPlayerRef = createRef<HTMLAudioElement>()

  // constructor(props: any) {
  //   super(props);
  //   this.audioPlayerRef = React.createRef();
  // }

  public state = {
    urls: [],
  }

  public render = (): ReactNode => {
    const { args } = this.props

    const urls = args["urls"]
    this.setState({ urls })

    const height = args["height"] ? args["height"] : 600

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const style: React.CSSProperties = {
      height: height,
    }

    // Maintain compatibility with older versions of Streamlit that don't send
    // a theme object.
    if (theme) {

    }

    return (
      <div style={style}>
        <Plot
          data={[
            {
              x: args["x"],
              y: args["y"],
              type: 'scatter',
              mode: 'markers',
            },
          ]}
          layout={{
            grid: {
              xaxes: [],
              yaxes: [],
            },
          }}
          onHover={this._onHover}
          onClick={this._onClick}
        />
        <audio
          src=""
          ref={this.audioPlayerRef}
          controls
        />
      </div>
    )
  }

  private playAudio = (url: string) => {
    console.log(this.audioPlayerRef)
    const audioElement: any = this.audioPlayerRef.current
    if (audioElement) {
      audioElement.src = url
      audioElement.volume = 0.4
      audioElement.play()
    }
  }

  private _onClick = (event: any) => {
    console.log("click", event)
  }

  private _onHover = (event: any) => {
    console.log("hover", event)
    const url = this.state.urls[event.points[0].pointIndex]
    this.playAudio(url)
  }

}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(AudioPlot)
