import { useState } from 'react';
import { useAppContext } from './context/AppContext';
import { BackgroundEnv } from './types';

export default function Controls() {
    const subsectionCSS = 'flex flex-col justify-start items-start gap-2';

    const { canvas, setCanvas, lighting, setLighting, innerShape, setInnerShape, outerShape, setOuterShape, baseShape, setBaseShape, floor, setFloor } = useAppContext();

    const [expandedSections, setExpandedSections] = useState({
        canvas: true,
        lighting: false,
        innerShape: false,
        outerShape: false,
        baseShape: false,
        floor: false,
    });

    interface ExpandedSections {
        canvas: boolean;
        lighting: boolean;
        innerShape: boolean;
        outerShape: boolean;
        baseShape: boolean;
        floor: boolean;
    }

    const toggleSection = (section: keyof ExpandedSections) => {
        setExpandedSections((prev: ExpandedSections) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className='flex flex-col gap-5 bg-slate-200 w-72 p-5 overflow-y-scroll'>
            <h1>Control Panel</h1>

            {/* Canvas Controls */}
            <div className={subsectionCSS}>
                <h2 onClick={() => toggleSection('canvas')} className="cursor-pointer">
                    Canvas {expandedSections.canvas ? '▼' : '▶'}
                </h2>
                {expandedSections.canvas && (
                    <div className={subsectionCSS}>
                        <label>Environment: 
                            <select
                                value={canvas.backgroundEnv}
                                onChange={(e) => setCanvas({ ...canvas, backgroundEnv: e.target.value as BackgroundEnv})}
                            >
                                <option value="">None</option>
                                <option value="apartment">Apartment</option>
                                <option value="city">City</option>
                                <option value="dawn">Dawn</option>
                                <option value="forest">Forest</option>
                                <option value="lobby">Lobby</option>
                                <option value="night">Night</option>
                                <option value="park">Park</option>
                                <option value="studio">Studio</option>
                                <option value="sunset">Sunset</option>
                                <option value="warehouse">Warehouse</option>
                            </select>
                        </label>
                        <label>Environment Intensity: 
                            <input 
                                type='number' 
                                min='0' max='1' step='0.1' 
                                value={canvas.envIntensity} 
                                onChange={(e) => setCanvas({ ...canvas, envIntensity: parseFloat(e.target.value) })} 
                            />
                        </label>
                        <label>Background Color: 
                            <input 
                                type='color' 
                                value={canvas.backgroundColor} 
                                onChange={(e) => setCanvas({ ...canvas, backgroundColor: e.target.value })} 
                            />
                        </label>
                        <label>Antialiasing: 
                            <input 
                                type='checkbox' 
                                checked={canvas.antialiasing} 
                                onChange={(e) => setCanvas({ ...canvas, antialiasing: e.target.checked })} 
                            />
                        </label>
                    </div>
                )}
            </div>

            {/* Lighting Controls */}
            <div className={subsectionCSS}>
                <h2 onClick={() => toggleSection('lighting')} className="cursor-pointer">
                    Lighting {expandedSections.lighting ? '▼' : '▶'}
                </h2>
                {expandedSections.lighting && (
                    <div className={subsectionCSS}>
                        <h3>Ambient</h3>
                        <label>Intensity: 
                            <input 
                                type='number' 
                                min='0' max='10' step='0.1' 
                                value={lighting.ambientIntensity} 
                                onChange={(e) => setLighting({ ...lighting, ambientIntensity: parseFloat(e.target.value) })} 
                            />
                        </label>
                        <label>Color: 
                            <input 
                                type='color' 
                                value={lighting.ambientColor} 
                                onChange={(e) => setLighting({ ...lighting, ambientColor: e.target.value })} 
                            />
                        </label>
                        <h3>Directional</h3>
                        <label>Intensity: 
                            <input 
                                type='number' 
                                min='0' max='10' step='0.1' 
                                value={lighting.intensity} 
                                onChange={(e) => setLighting({ ...lighting, intensity: parseFloat(e.target.value) })} 
                            />
                        </label>
                        <label>Color: 
                            <input 
                                type='color' 
                                value={lighting.color} 
                                onChange={(e) => setLighting({ ...lighting, color: e.target.value })} 
                            />
                        </label>
                        {(['xPos', 'yPos', 'zPos'] as const).map((axis) => (
                            <label key={axis}>
                                {axis}: 
                                <input 
                                    type='number' 
                                    value={lighting[axis]} 
                                    onChange={(e) => setLighting({ ...lighting, [axis]: parseFloat(e.target.value) })} 
                                />
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Inner Shape Controls */}
            <div className={subsectionCSS}>
                <h2 onClick={() => toggleSection('innerShape')} className="cursor-pointer">
                    Inner Shape {expandedSections.innerShape ? '▼' : '▶'}
                </h2>
                {expandedSections.innerShape && (
                    <div className={subsectionCSS}>
                        <label>Type: 
                            <select 
                                value={innerShape.type} 
                                onChange={(e) => setInnerShape({ ...innerShape, type: e.target.value as "Box" | "Sphere" | "TorusKnot" })}
                            >
                                <option value="Box">Box</option>
                                <option value="Sphere">Sphere</option>
                                <option value="TorusKnot">TorusKnot</option>
                            </select>
                        </label>
                        <p>Standard Material</p>
                        <label>Color: 
                            <input
                                type="color"
                                value={innerShape.color || "#ffffff"}
                                onChange={(e) => setInnerShape({ ...innerShape, color: e.target.value })}
                            />
                        </label>
                        <label>Roughness: 
                            <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.01"
                                value={innerShape.roughness || 0.5}
                                onChange={(e) => setInnerShape({ ...innerShape, roughness: parseFloat(e.target.value) })}
                            />
                        </label>
                        <label>Metalness: 
                            <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.01"
                                value={innerShape.metalness || 0.5}
                                onChange={(e) => setInnerShape({ ...innerShape, metalness: parseFloat(e.target.value) })}
                            />
                        </label>
                    </div>
                )}
            </div>

            {/* Outer Shape Controls */}
            <div className={subsectionCSS}>
                <h2 onClick={() => toggleSection('outerShape')} className="cursor-pointer">
                    Outer Shape {expandedSections.outerShape ? '▼' : '▶'}
                </h2>
                {expandedSections.outerShape && (
                    <div className={subsectionCSS}>
                        <label>Type: 
                            <select 
                                value={outerShape.type} 
                                onChange={(e) => setOuterShape({ ...outerShape, type: e.target.value as "Box" | "Sphere" | "Torus" | undefined })}
                            >
                                <option value="Box">Box</option>
                                <option value="Sphere">Sphere</option>
                                <option value="Torus">Torus</option>
                                <option value="">None</option>
                            </select>
                        </label>
                        <p>Transmission Material</p>
                        <label>Color: 
                            <input
                                type="color"
                                value={outerShape.color || "#ffffff"}
                                onChange={(e) => setOuterShape({ ...outerShape, color: e.target.value })}
                            />
                        </label>
                        <label>Transmission: 
                            <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.01"
                                value={outerShape.transmission || 0}
                                onChange={(e) => setOuterShape({ ...outerShape, transmission: parseFloat(e.target.value) })}
                            />
                        </label>
                        <label>Clearcoat: 
                            <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.01"
                                value={outerShape.clearcoat || 0}
                                onChange={(e) => setOuterShape({ ...outerShape, clearcoat: parseFloat(e.target.value) })}
                            />
                        </label>
                    </div>
                )}
            </div>

            {/* Base Shape Controls */}
            <div className={subsectionCSS}>
                <h2 onClick={() => toggleSection('baseShape')} className="cursor-pointer">
                    Base Shape {expandedSections.baseShape ? '▼' : '▶'}
                </h2>
                {expandedSections.baseShape && (
                    <div className={subsectionCSS}>
                        <p>Basic Material</p>
                        <label>Color: 
                            <input
                                type="color"
                                value={baseShape.color || "#ffffff"}
                                onChange={(e) => setBaseShape({ ...baseShape, color: e.target.value })}
                            />
                        </label>
                        <label>Opacity: 
                            <input
                                type="number"
                                min="0"
                                max="1"
                                step="0.01"
                                value={baseShape.opacity || 1}
                                onChange={(e) => setBaseShape({ ...baseShape, opacity: parseFloat(e.target.value) })}
                            />
                        </label>
                        <label>Wireframe: 
                            <input
                                type="checkbox"
                                checked={baseShape.wireframe || false}
                                onChange={(e) => setBaseShape({ ...baseShape, wireframe: e.target.checked })}
                            />
                        </label>
                        <label>Transparent: 
                            <input
                                type="checkbox"
                                checked={baseShape.transparent || false}
                                onChange={(e) => setBaseShape({ ...baseShape, transparent: e.target.checked })}
                            />
                        </label>
                    </div>
                )}
            </div>

                {/* Floor Controls */}
                <div className={subsectionCSS}>
                    <h2 onClick={() => toggleSection('floor')} className="cursor-pointer">
                        Floor {expandedSections.floor ? '▼' : '▶'}</h2>
                    {expandedSections.floor && (
                        <div className={subsectionCSS}>
                            <p>Reflector Material</p>
                            <label>Color: 
                                <input
                                    type="color"
                                    value={floor.color || "#202020"}
                                    onChange={(e) => setFloor({ ...floor, color: e.target.value })}
                                />
                            </label>
                            <label>Blur X: 
                                <input
                                    type="number"
                                    value={floor.blur[0]}
                                    onChange={(e) => setFloor({ ...floor, blur: [parseFloat(e.target.value), floor.blur[1]] })}
                                />
                            </label>
                            <label>Blur Y: 
                                <input
                                    type="number"
                                    value={floor.blur[1]}
                                    onChange={(e) => setFloor({ ...floor, blur: [floor.blur[0], parseFloat(e.target.value)] })}
                                />
                            </label>
                            <label>Resolution: 
                                <input
                                    type="number"
                                    value={floor.resolution}
                                    onChange={(e) => setFloor({ ...floor, resolution: parseInt(e.target.value) })}
                                />
                            </label>
                            <label>Mix Blur: 
                                <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={floor.mixBlur}
                                    onChange={(e) => setFloor({ ...floor, mixBlur: parseFloat(e.target.value) })}
                                />
                            </label>
                            <label>Mix Strength: 
                                <input
                                    type="number"
                                    value={floor.mixStrength}
                                    onChange={(e) => setFloor({ ...floor, mixStrength: parseFloat(e.target.value) })}
                                />
                            </label>
                            <label>Roughness: 
                                <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={floor.roughness}
                                    onChange={(e) => setFloor({ ...floor, roughness: parseFloat(e.target.value) })}
                                />
                            </label>
                            <label>Depth Scale: 
                                <input
                                    type="number"
                                    value={floor.depthScale}
                                    onChange={(e) => setFloor({ ...floor, depthScale: parseFloat(e.target.value) })}
                                />
                            </label>
                            <label>Min Depth Threshold: 
                                <input
                                    type="number"
                                    value={floor.minDepthThreshold}
                                    onChange={(e) => setFloor({ ...floor, minDepthThreshold: parseFloat(e.target.value) })}
                                />
                            </label>
                            <label>Max Depth Threshold: 
                                <input
                                    type="number"
                                    value={floor.maxDepthThreshold}
                                    onChange={(e) => setFloor({ ...floor, maxDepthThreshold: parseFloat(e.target.value) })}
                                />
                            </label>
                            <label>Metalness: 
                                <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={floor.metalness}
                                    onChange={(e) => setFloor({ ...floor, metalness: parseFloat(e.target.value) })}
                                />
                            </label>
                            <label>Mirror: 
                                <input
                                    type="number"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={floor.mirror}
                                    onChange={(e) => setFloor({ ...floor, mirror: parseFloat(e.target.value) })}
                                />
                            </label>
                        </div>
                    )}  
            </div>
        </div>
    );
}
