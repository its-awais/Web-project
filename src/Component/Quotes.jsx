import { useEffect } from "react";
import { useState } from "react"


const Quotes = () => {
    const [quotes,setQuotes] = useState([]);
    const [author,setAuthor] = useState("")
    const [currentQuotes,setCurrentQuotes] = useState(null)
    const [color,setColor] = useState("#ffffff");
    useEffect(() => {
    const fetchQuotes = async () => {
        try {
       const response = await fetch("/api/quotes");
       const data = await response.json();
      setQuotes(data)
      setAuthor(data)
      if(data.length > 0 ){
      setCurrentQuotes(data[0])
      }
        } catch(error) {
            console.error("you have an error fetching that data",error);
        }
    }
    fetchQuotes();
},[])
const getRandomColor = ()=>{
    const letters = '0123456789ABCDEF'; 
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
}
return color;
}

    function getNewQuote() {
        if (quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuotes(quotes[randomIndex]); // Set a random quote
            setColor(getRandomColor());
        }
    }
  
  return (
    <>
    <main className="d-flex justify-content-center align-items-center"style={{backgroundColor : color}}>
       
   {currentQuotes &&(
        <div key={currentQuotes.id}  id="quote-box" className="rounded" style={{color : color}}>
            <div id="text" className="quote-text text-center mx-4 my-4 fs-3 fw-normal">
                {currentQuotes.quote}
            </div>
            <div id="author" className="quote-author text-end mx-3 fs-5 fw-light">
                {currentQuotes.author}
            </div>
            <div className="d-flex justify-content-end">
            <button id="new-quote" className="d-flex mx-3 my-4 fs-5 shadow-lg rounded p-1" onClick={getNewQuote} style={{backgroundColor : color}}>New Quote</button>
            </div>
            <a id="tweet-quote" target="_blank"  href="https://twitter.com/intent/tweet?text=YourQuoteHere">
            <i className="fa fa-twitter fa-3x my-4 mx-3" style={{color : color}} />
            </a>
        </div>
   )}
    </main>
    </>
  )
}

export default Quotes
