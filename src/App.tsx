import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import useCode from "./context/CodeProvider";

const App = () => {
  const{iframeSrc, consoleOutput, htmlCode, cssCode, jsCode,
     handleHtmlChange, handleCssChange, handleJsChange, clearHandler, downloadCombinedFile}= useCode();

  return (
    <div className="container">  
      <div className="name">
        <div>HTML</div>
        <div>CSS</div>
        <div>JAVASCRIPT</div>
      </div>

      <div className="code-container">
        <div className="htmlbar">
          <CodeMirror
            value={htmlCode}
            extensions={[html()]}
            onChange={handleHtmlChange}
            height="300px"   
         />
        </div>

        <div className="cssbar">
          <CodeMirror
            value={cssCode}
            extensions={[css()]}
            onChange={handleCssChange}
            height="300px"  
          />
        </div>

        <div className="jsbar">
          <CodeMirror
            value={jsCode}
            extensions={[javascript()]}
            onChange={handleJsChange}
            height="300px"  
          />
        </div>
      </div>

      <div className="btn">
        <button onClick={()=>{downloadCombinedFile()}}>download</button>
        <button onClick={()=>{clearHandler()}}>clear</button>
      </div>

      <div className="output">
        <iframe
          id="iframe"
          title="output"
          srcDoc={iframeSrc}
          sandbox="allow-scripts"
          style={{ width: "100%", height:"190px", backgroundColor:"white", border:"none"}}
        ></iframe>
      </div>

      <div className="console">
        <iframe
          id="iframe-console"
          title="console"
          srcDoc={consoleOutput}
          sandbox="allow-scripts"
          style={{ width: "100%",height:"100%", backgroundColor:"black", border:"none", color:"white", caretColor: "white" }}
        ></iframe>
      </div>

    </div>
  )
}

export default App
