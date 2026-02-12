import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Check, Move } from 'lucide-react';

const ImageCropper = ({ imageSrc, onCropComplete, onCancel }) => {
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const canvasRef = useRef(null);

    const [minZoom, setMinZoom] = useState(0.1);

    const onImageLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        // Assume crop frame is roughly 300x300 or 70% of container.
        // Let's use the container size to estimate.
        if (containerRef.current) {
            const { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
            const cropBoxSize = Math.min(containerWidth, containerHeight) * 0.7; // The 70% hole

            // Calculate scale to cover the crop box
            const scaleX = cropBoxSize / naturalWidth;
            const scaleY = cropBoxSize / naturalHeight;
            const scale = Math.max(scaleX, scaleY);

            setMinZoom(scale * 0.5); // Allow zooming out a bit more
            setZoom(scale);
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleCrop = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = imageRef.current;

        // The crop area is the central 300x300 (or whatever size) div.
        // Let's assume the crop frame is 300x300.
        const cropSize = 300;

        canvas.width = cropSize;
        canvas.height = cropSize;

        // Clear
        ctx.clearRect(0, 0, cropSize, cropSize);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, cropSize, cropSize);

        // Draw image
        // Scale and translate
        // We need to map the visible pixels in the crop frame to the canvas.

        // The image is displayed with transform: translate(offset.x, offset.y) scale(zoom)
        // relative to the center of the viewport?
        // Let's implement visual logic first.

        // Let's define the center coordinate system.
        // Container center is (0,0) conceptually for offset?
        // Let's say container is 500x500. Crop frame is 300x300 centered.
        // Image is rendered via <img />.

        // More robust approach:
        // 1. Calculate the position of the image element relative to the crop frame.
        // 2. Draw that slice.

        // Actually, let's use the natural size of the image.
        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;

        // Current rendered dimensions
        const renderedWidth = naturalWidth * zoom;
        const renderedHeight = naturalHeight * zoom;

        // The visible crop area in the RENDERED IMAGE coordinates.
        // We know the offset moves the image.
        // Let's simply draw the image onto the canvas with the same transform logic, 
        // but shifted so the crop area is at 0,0.

        // If the implementation is too complex for scratch, I will use a simplified approach:
        // Just use the logic: 
        // dx = offset.x - (renderedWidth - cropSize) / 2 + correction?

        // Let's try to infer from DOM rects, simpler.
        // But `onCrop` logic needs to be precise.

        // Let's use a standard "draw image with transform" approach.
        // Render inputs:
        // offset.x, offset.y (pixels moved from center?)
        // zoom (scale)

        // Center of crop frame: cx, cy
        // Center of image: ix + offset.x, iy + offset.y

        // Let's look at the JSX structure first.
        // <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        //    <img style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} />
        //    <div className="absolute inset-0 pointer-events-none border-[100px] border-black/50" /> 
        // </div>

        // "border-[100px]" effectively creates a window if the container is bigger.
        // Let's say container is 500x500. border is 100px. Inner hole is 300x300.
        // This is a robust way to mask.

        // So, crop frame is at:
        // X: 100 to 400
        // Y: 100 to 400
        // (inside the 500x500 container)

        // The image center is initially at 250, 250 (container center).
        // With translate(x, y), its center moves to 250+x, 250+y.

        // We want to capture the area (100, 100) to (400, 400) of the container.

        // Canvas drawImage params:
        // img, sx, sy, sw, sh, dx, dy, dw, dh

        // It's easier to use ctx.setTransform to verify.

        ctx.save();
        // Move origin to center of canvas
        ctx.translate(cropSize / 2, cropSize / 2);
        // Apply user transforms
        ctx.translate(offset.x, offset.y);
        ctx.scale(zoom, zoom);
        // Draw image centered at origin
        ctx.drawImage(image, -naturalWidth / 2, -naturalHeight / 2);
        ctx.restore();

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCropComplete(dataUrl);
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-800 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 flex justify-between items-center border-b border-slate-700">
                    <h3 className="text-white font-bold flex items-center gap-2">
                        <Move size={18} />
                        이미지 자르기 (1:1)
                    </h3>
                    <button onClick={onCancel} className="text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full aspect-square bg-slate-900 overflow-hidden cursor-move select-none touch-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="Crop target"
                            className="max-w-none origin-center pointer-events-auto"
                            style={{
                                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                                transition: isDragging ? 'none' : 'transform 0.1s'
                            }}
                            draggable={false}
                        />
                    </div>

                    {/* Overlay Mask - Square hole in the middle */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="w-full h-full bg-black/60 relative">
                            {/* The "Hole" */}
                            {/* We can use CSS to make a hole, or just use a bordered box if we fix dimensions. 
                                 A flexible way is using a clear div with a massive box shadow. 
                             */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border-2 border-white bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]" />

                            {/* Grid lines */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] opacity-30">
                                <div className="absolute top-1/3 left-0 w-full h-px bg-white" />
                                <div className="absolute top-2/3 left-0 w-full h-px bg-white" />
                                <div className="absolute left-1/3 top-0 w-px h-full bg-white" />
                                <div className="absolute left-2/3 top-0 w-px h-full bg-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-4 bg-slate-800">
                    <div className="flex items-center gap-4">
                        <ZoomOut size={20} className="text-slate-400" />
                        <input
                            type="range"
                            min="0.1"
                            max="3"
                            step="0.01"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <ZoomIn size={20} className="text-slate-400" />
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-3 bg-slate-700 text-white rounded-xl font-bold hover:bg-slate-600 transition-colors"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleCrop}
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
                        >
                            <Check size={18} />
                            자르기 및 완료
                        </button>
                    </div>
                </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default ImageCropper;
