import { useState, useCallback, useEffect, useRef } from "react"

function App() {
    const [length, setLength] = useState(8)
    const [numAllowed, setNumAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")

    //COPY TO CLIPBOARD LOGIC
    //useRef Hook
    const passwordRef = useRef(null)

    const copyPassToClipboard = useCallback(() => {
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
    }, [password])

    const passGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if(numAllowed) str += "0123456789"
        if(charAllowed) str += "`~!@#$%^&*()-_=+[]{};'/.,?><"

        for (let i = 1; i < length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char);
        }

        setPassword(pass);

    }, [length, numAllowed, charAllowed, setPassword])

    useEffect(() => {passGenerator()}, [length, numAllowed, charAllowed, passGenerator])

    return (

        <>
            <h1 className="text-4xl text-center p-8 text-white">Password Generator</h1>
            <div className="bg-gray-700 text-orange-500 w-full max-w-md px-4 py-8 mx-auto rounded-xl shadow-md text-center">
                <div className="flex shadow rounded-lg overflow-hidden mb-8">
                    <input 
                        type="text" 
                        className="py-1 px-3 w-full outline-none" 
                        value={password} 
                        placeholder="password" 
                        ref={passwordRef}
                        readOnly
                    />
                    <button 
                        className="outline-none bg-blue-700 text-white shrink-0 px-3 py-0.5"
                        onClick={copyPassToClipboard}
                    >
                        copy
                    </button>
                </div>
                <div className="flex text-sm gap-x-4">
                    <div className="flex items-center gap-x-1">
                        <input 
                            type="range" 
                            className="cursor-pointer" 
                            id="range"
                            min={6} 
                            max={36} 
                            value={length} 
                            onChange={(e) => {setLength(e.target.value)}}
                        />
                        <label htmlFor="range">Length: {length}</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input 
                        type="checkbox" 
                        className="cursor-pointer" 
                        id="numberInput" 
                        defaultChecked={numAllowed} 
                        onChange={() => {setNumAllowed((prev) => !prev)}} />
                        <label htmlFor="numberInput">Numbers</label>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <input 
                        type="checkbox" 
                        className="cursor-pointer" 
                        id="charInput" 
                        defaultChecked={charAllowed} 
                        onChange={() => {setCharAllowed((prev) => !prev)}} />
                        <label htmlFor="charInput">Characters</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
