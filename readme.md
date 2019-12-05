Why are we using promises here? - I think we use it to make sure that the DAL is communicating with the rest of our code.

What benefits are there for breaking out these functions into their own resource? - I think it is to ensure that each
function is running properly, and it is nice to have them seperated for readability 

What other functionality could you foresee leveraging this separation of concerns technique with? - Really any program that needs multiple repositories for code. Front end and Back end