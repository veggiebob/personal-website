// small three.js demo
// https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const sin = Math.sin;
const cos = Math.cos;
const pi = Math.PI;
    
const polyHeight = (n, r, angle) => {
    const d = 2 * pi / n;
    return sin((pi - d) / 2) / sin((pi + d) / 2 - angle) * r;
}
const mod = (a, b) => ((a % b) + b) % b;
const getFirstMesh = (object) => {
    if (object.type === 'Mesh') {
        return object;
    } else {
        return getFirstMesh(object.children[0]);
    }
}
function rollCube(scrollAmount, cube, cube_radius) {
    let x = (scrollAmount-0.5) * 10;
    let angle = x / cube_radius;
    cube.position.x = x;
    cube.rotation.z = -angle;
    cube.position.y = cube_radius - polyHeight(4, cube_radius, mod(angle, 2 * pi / 4));
}
function smooth(x, exponent) {
    return Math.pow(1/2 - cos(pi * x)/2, exponent);
}
function readViewCube(scrollAmount, cube, cube_radius) {
    const stops = 4;
    let x = scrollAmount;
    let rot_p = 1/stops * (smooth(mod(x, 1/stops) * stops, 5) + Math.floor(x * stops));
    let angle = rot_p * 2 * pi;
    cube.rotation.x = -angle;
}
const ThreeFun = () => {
    const mountRef = useRef(null);
    const scrollElemRef = useRef(null);
    const buttonA = useRef(null);

    const scrollHeight = 10_000;

    let scrollAmount = 0;

    useEffect(() => {
        scrollElemRef.current.style.height = `${scrollHeight}px`;

        // set up scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const render = () => {
            renderer.render(scene, camera);
        };
        
        mountRef.current.appendChild(renderer.domElement);
    
        // add a cube
        const cube_radius = 1;
        let sideLength = cube_radius / Math.sqrt(2) * 2

        

        const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        let cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);
        // import cube model from public/assets/models/cube.obj
        const objLoader = new OBJLoader();
        const mtlLoader = new MTLLoader();
        mtlLoader.load('assets/models/shiny_cube.mtl', (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load('assets/models/shiny_cube.obj', (object) => {
                // scene.add(object);
                scene.remove(cube);
                let obj = getFirstMesh(object);
                // scene.add(obj);
                // console.log(obj);
                cube = obj;
                // cube.material = material;
                cube.scale.set(sideLength/2, sideLength/2, sideLength/2);
            });
        });

        const gltfLoader = new GLTFLoader();
        // const paper_crumple_path = '/home/veggiebob/3D/exports/paper_crumple.glb';
        const paper_crumple_path = 'assets/models/paper_crumple.glb'
        // const paper_crumple_path = 'assets/models/shiny_cube.glb';
        // const paper_crumple_path = 'three/examples/models/gltf/DamagedHelmet/glTF-instancing/DamagedHelmetGpuInstancing.gltf';
        gltfLoader.load(paper_crumple_path, async function(gltf) {
            console.log(gltf);
            const model = gltf.scene;
            const animations = gltf.animations; // Contains all the animations
            
            // Add the model to the scene
            await renderer.compileAsync(model, camera, scene);
            scene.add(model);
            
            // Set up an AnimationMixer to play the animations
            const mixer = new THREE.AnimationMixer(model);
            
            // // Play the animation (assuming there's only one)
            const action = mixer.clipAction(animations[0]);
            action.play();
            
            // // Update the mixer in the render loop to keep animations running
            // function animate() {
            //     requestAnimationFrame(animate);
                
            //     // Update the animation mixer
            //     const delta = clock.getDelta(); // Clock to track time
            //     mixer.update(delta);
                
            //     renderer.render(scene, camera);
            // }
            // animate();
        });
        

        

        // add a point light above the cube
        const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
        pointLight.position.set(0, 10, 10);
        scene.add(pointLight);

        // add a sun
        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(500, 500, 500);
        sun.lookAt(0, 0, 0);
        scene.add(sun);

        // add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

    
        camera.position.z = 20;

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render ); // use if there is no animation loop
        controls.minDistance = 0.2;
        controls.maxDistance = 10;
        controls.target.set( 0, 0.25, 0 );
        controls.update();
        
        // animate the cube
        const animate = () => {
            requestAnimationFrame(animate);
        
            scrollAmount = window.scrollY / (scrollHeight - window.innerHeight);
            // rollCube(scrollAmount, cube, cube_radius);
            readViewCube(scrollAmount, cube, cube_radius);

            // pointLight.position.set(cube.position.x, cube.position.y + sideLength, cube.position.z + sideLength * 2);
            pointLight.position.set(-camera.position.x, camera.position.y, camera.position.z);
            // buttonA.current.style['margin-left'] = `${x * 100}px`;
            // buttonA.current.style['margin-top'] = `${300}px`;
            render();
        };
    
        animate();
        
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            render();
        });

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        }
    }, []);
    
    return <div>
            <div className='scroll-element' ref={scrollElemRef}/>
            <div className='three-foreground' ref={mountRef}/>
            <button ref={buttonA} style={{position: 'fixed', color: 'white', zIndex: 21}} className="white" type="button">hello everyone</button>;
        </div>
    };

export default ThreeFun;