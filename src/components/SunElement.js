import React from 'react';

const SunElement = () => {
        return (
            <svg xmlns='http://www.w3.org/2000/svg' className="sun__element" viewBox='0 0 114.176 111.42' height='200' width='200'>
                <g transform='translate(-24.804 -88.955)'>
                    <circle r='23.001' cy='144.252' cx='82.46' fill='#fce053' />
                    <rect className="yellow-sunbeam" ry='2.175' transform='matrix(-.73802 -.67478 .70915 -.70506 0 0)'
                    y='-13.7' x='-161.941' height='21.418' width='4.359' fill='#fce053' />
                    <rect className="yellow-sunbeam"ry='2.175' transform='matrix(.73802 .67478 -.70915 .70506 0 0)' 
                    y='87.903' x='156.166' height='21.418' width='4.359' fill='#fce053'/>
                    <rect className="yellow-sunbeam" ry='2.175' transform='matrix(.67478 -.73802 .70506 .70915 0 0)'
                    y='194.993' x='-42.981' height='21.418' width='4.359' fill='#fce053' />
                    <rect className="yellow-sunbeam" ry='2.175' transform='matrix(-.67478 .73802 -.70506 -.70915 0 0)' 
                    y='-119.686' x='45.078' height='21.418' width='4.359' fill='#fce053'></rect>
                    <rect className="orange-sunbeam" ry='2.175' transform='matrix(-.99947 .0325 .0151 -.99989 0 0)' y='-113.089'
                    x='-85.349' height='10' width='4.359' fill='#fa9f42' />
                    <rect className="orange-sunbeam" ry='2.175' transform='matrix(.99947 -.0325 -.0151 .99989 0 0)' y='181.73' x='82.399' height='21.418' width='4.359' fill='#fa9f42'></rect>
                    <rect className="orange-sunbeam" ry='2.175' transform='matrix(-.0325 -.99947 .99989 .0151 0 0)' y='112.959'
                    x='-144.204' height='10' width='4.359' fill='#fa9f42' />
                    <rect className="orange-sunbeam" ry='2.175' transform='matrix(.0325 .99947 -.99989 -.0151 0 0)' y='-42.205'
                    x='143.75' height='10' width='4.359' fill='#fa9f42' />
                </g>
            </svg>
        );
}

export default SunElement;