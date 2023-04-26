const Main = () => {

    return <>
    
    
        <h1>Speed Game</h1>

        <p>Score: <span className="score"></span></p>
            <div className="circles">
                <div className="circle">

                </div>

                <div className="circle">

                </div>

                <div className="circle">

                </div>

                <div className="circle">

                </div>

            </div>

            <div>
                <button id="start">
                    Start
                </button>

                <button id="end" class="hidden">
                    End
                </button>
            </div>

            <div className="overlay">
                <div className="modal">
                    <p>Oops, game over</p>
                    <p>Your score was <span className="score-end"></span></p>

                    <div>

                    <button id="close">close</button>
                </div>

                </div>

            </div>

    </>
}

export default Main