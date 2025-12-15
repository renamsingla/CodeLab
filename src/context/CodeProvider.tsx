import React, { createContext, useContext, useState } from "react"

interface CodeContextType {
  iframeSrc:string,
  consoleOutput:string,
  handleHtmlChange: (value: string) => void;
  handleCssChange: (value: string) => void;
  handleJsChange: (value: string) => void;
  clearHandler: ()=> void;
  downloadCombinedFile: ()=>void;
  htmlCode:string,
  cssCode:string,
  jsCode:string
}

const codeContext = createContext<CodeContextType | undefined>(undefined);

export const CodeProvider=({children}:{children: React.ReactNode})=>{
    
    const [htmlCode, setHtmlCode] = useState("<h1>Hello</h1>");
    const [cssCode, setCssCode] = useState("h1 { color: red; }");
    const [jsCode, setJsCode] = useState("console.log('Hello');");
    const [iframeSrc, setIframeSrc] = useState("");
    const [consoleOutput, setConsoleOutput] = useState("");

    const clearHandler=()=>{
        setHtmlCode("");
        setCssCode("");
        setJsCode("");
        setConsoleOutput("");
        setIframeSrc("");
    }

    const handleHtmlChange = (value: string) => {
        setHtmlCode(value);
        updateOutputIframe(value, cssCode, jsCode);
    };

    const handleCssChange = (value: string) => {
        setCssCode(value);
        updateOutputIframe(htmlCode, value, jsCode);
    };

    const handleJsChange = (value: string) => {
        setJsCode(value);
        updateOutputIframe(htmlCode, cssCode, value);
        updateConsoleIframe(value);
    };

    const updateOutputIframe = (html: string, css: string, js: string) => {
    const combined = `
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>
            ${js}
            </script>
        </body>
        </html>
    `;
    setIframeSrc(combined);
    };

    const updateConsoleIframe = (js: string) => {
        const consoleCode = `
            <html>
            <head>
                <style>
                body {
                    background: black;
                    color: white;
                    font-family: monospace;
                    font-size: 14px;
                    margin: 0;
                    padding: 8px;
                }
                </style>
            </head>
            <body>
                <script>
                const logs = [];
                console.log = function (...args) {
                    logs.push(args.join(" "));
                    document.body.innerHTML = logs.join("<br>");
                };

                try {
                    ${js}
                } catch (err) {
                    console.log(err);
                }
                </script>
            </body>
            </html>
        `;
        setConsoleOutput(consoleCode);
    };


    const generateCombinedHTML = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Editor Export</title>
    <style>
        ${cssCode}
    </style>
    </head>
    <body>
    ${htmlCode}
    <script>
        ${jsCode}
    </script>
    </body>
    </html>
    `;
    };

    const downloadCombinedFile = () => {
        const combinedCode = generateCombinedHTML();
        const blob = new Blob([combinedCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "index.html"; // file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };




    return(
        <codeContext.Provider value={{
            iframeSrc,
            consoleOutput, 
            handleHtmlChange,
            handleCssChange, 
            handleJsChange,
            clearHandler,
            downloadCombinedFile,
            htmlCode,
            cssCode,
            jsCode
            }}>
            {children}
        </codeContext.Provider>
    )
}

export default function useCode(){
    const context = useContext(codeContext);
    if (!context) {
        throw new Error("useCode must be used within a CodeProvider");
    }
    return context;
}