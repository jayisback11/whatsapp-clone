import { Circle } from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
            <Circle size={100} color='green'/>
        </center>
    )
}

export default Loading
