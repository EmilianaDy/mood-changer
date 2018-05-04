import React, { Component} from 'react';
import AnimationClouds from './AnimationClouds';
import classnames from 'classnames';
import frog from '../images/frog.svg'

export default class AnimationRain extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.setDropsStartingPosition = this.setDropsStartingPosition.bind(this);
        this.moveDrops = this.moveDrops.bind(this);
        this.rainDrops = [];      
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight - 100;
    }

    componentDidMount() {
        this.setDropsStartingPosition();
        this.animFrame = requestAnimationFrame(this.moveDrops);
    }

    componentDidUpdate() {
        this.setDropsStartingPosition();
    }

    setMaxRainDrops = () => {
        if (this.props.dropsAmount==="high") {
            this.maxRainDrops = 150;
        }
        else if (this.props.dropsAmount==="low") {
            this.maxRainDrops = 50;
        }
    }


    moveDrops = () => {
        if (this.canvasRef.current != null) {
            var ctx = this.canvasRef.current.getContext('2d');
            ctx.fillStyle = 'rgb(134, 187, 216)';
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            for (let i = 0; i < this.maxRainDrops; i++) {
                if (this.rainDrops[i]) {
                    var drop = this.rainDrops[i];
                    ctx.beginPath();
                    ctx.moveTo(drop.x, drop.y);
                    ctx.arc(drop.x, drop.y, 5, 0, Math.PI*2, true); 
                    ctx.moveTo(drop.x+5, drop.y);
                    ctx.lineTo(drop.x,drop.y-10);
                    ctx.lineTo(drop.x-5,drop.y);
                    ctx.lineTo(drop.x, drop.y); 
                    ctx.closePath();
                    ctx.fill();
                    drop.y+=3
                    
                    if (drop.y >= this.canvasHeight) {
                        drop.y = 0;
                    }
                }         
            } 
            
            requestAnimationFrame(this.moveDrops);
        }   
    }

    setDropsStartingPosition = () => {  
        this.setMaxRainDrops();

        for (let i = 0; i < this.maxRainDrops; i++) {
            this.rainDrops.push({
                x: Math.random()*this.canvasWidth,
                y: Math.random()*this.canvasHeight
            })
        }
    }

    render() {
        var rainClassNames = classnames({
            "rain__wrapper": true,
            "light__rain__wrapper": this.props.dropsAmount==="high" ? false : true
        });

        var cloudDensity = this.props.dropsAmount==="high" ? "high" : "medium";
        return (
            <div className={rainClassNames}>
            <AnimationClouds cloudDensity={cloudDensity}/>
                <canvas className="rainCanvas" ref={this.canvasRef} width={this.canvasWidth} height={this.canvasHeight}></canvas>
                <img className="frog-image" alt="plants" src={frog}/>
            </div>
        );
    }
}