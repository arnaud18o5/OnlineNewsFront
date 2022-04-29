import { marked } from 'marked';

// Override function


const Marked = () => {
    /*const renderer = {
      heading(text, level) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    
        return {
            __html: `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`
        } 
      }
    };*/
    
    //marked.use({ renderer });

    console.log(marked.parse('# Marked in the browser\n\nRendered by **marked**.'));

    const returnHTMLElement = (element) => {
        return {
            __html: marked.parse(element)
        }
    }
    
    // Run marked
    return(
        <>
        <div id="markedElement" dangerouslySetInnerHTML={returnHTMLElement('# Marked in the browser\n\nRendered by **marked**.\n[Google](https://www.google.fi/) \n ![Tux, the Linux mascot](http://localhost:4000/images/7mT8YrB0k3sg.jpeg)')}>

        </div>
        </>
    );

}


export default Marked;