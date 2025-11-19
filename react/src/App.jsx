import React, {useState, useEffect} from "react";

import Aurora from "./components/Aurora/Aurora.jsx";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slidesData = [
    {
        id: "app.py",
        title: "App",
        desc: "Estructura principal y endpoints. Orquesta los módulos y expone la API.",
        accept: ".csv"
    },
    {
        id: "arbol.py",
        title: "Árbol de decisión",
        desc: "Entrena un clasificador basado en árboles para segmentar y predecir clases.",
        accept: ".csv"
    },
    {
        id: "chimerge.py",
        title: "ChiMerge",
        desc: "Algoritmo de discretización que agrupa valores estadísticamente similares.",
        accept: ".csv"
    },
    {
        id: "data.csv",
        title: "Dataset (data.csv)",
        desc: "Datos crudos en formato CSV: entradas para preprocesamiento y modelado.",
        accept: ".csv"
    },
    {
        id: "escala_log.py",
        title: "Escala Log",
        desc: "Transformación logarítmica para variables con distribución sesgada.",
        accept: ".csv"
    },
    {
        id: "estandarizacion.py",
        title: "Estandarización",
        desc: "Normaliza características para media 0 y desviación estándar 1.",
        accept: ".csv"
    },
    {
        id: "kmedias.py",
        title: "K-Medias",
        desc: "Clustering no supervisado que agrupa observaciones en k clústeres.",
        accept: ".csv"
    },
    {
        id: "kmodas.py",
        title: "K-Modas",
        desc: "Clustering para variables categóricas usando modos en vez de medias.",
        accept: ".csv"
    },
    {
        id: "normalizacion.py",
        title: "Normalización",
        desc: "Escala variables a un rango (ej. 0-1) para algoritmos sensibles a escala.",
        accept: ".csv"
    }
];

export default function App() {
    // guardamos archivos seleccionados por slide
    const [files, setFiles] = useState(Array(slidesData.length).fill(null));

    useEffect(() => {
        // si tu Aurora crea un canvas encima, puedes forzarlo aquí (opcional):
        const apply = () => {
            const nodes = document.querySelectorAll(".aurora-background canvas");
            nodes.forEach(c => {
                c.style.position = "absolute";
                c.style.inset = "0";
                c.style.width = "100%";
                c.style.height = "100%";
                c.style.zIndex = "-9999";
                c.style.pointerEvents = "none";
            });
        };
        // intentar un par de veces porque el canvas puede montarse async
        apply();
        setTimeout(apply, 300);
    }, []);

    const handleFileChange = (index, e) => {
        const file = e.target.files[0] ?? null;
        setFiles(prev => {
            const next = [...prev];
            next[index] = file;
            return next;
        });
    };

    const removeFile = (index) => {
        setFiles(prev => {
            const next = [...prev];
            next[index] = null;
            return next;
        });
        // opcional: limpiar input value para permitir re-subir mismo archivo
        const inp = document.getElementById(`file-input-${index}`);
        if (inp) inp.value = "";
    };

    const handleDrop = (index, e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0] ?? null;
        if (file) {
            setFiles(prev => {
                const next = [...prev];
                next[index] = file;
                return next;
            });
            const inp = document.getElementById(`file-input-${index}`);
            if (inp) inp.files = e.dataTransfer.files;
        }
    };

    const prevent = (e) => e.preventDefault();

    return (
        <div className="app-container">
            {/* Aurora ya existente */}
            <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
                className="aurora-background"
            />

            {/* Header */}
            <div className="hero-text">
                <h1 className="hero-title">Analytica Pro</h1>
                <p className="hero-subtitle">
                    Convertimos tus datos en decisiones inteligentes. Automatización, análisis y visualización para
                    impulsar tu negocio.
                </p>
            </div>

            {/* Carousel */}
            <div className="carousel-container" style={{marginTop: "260px"}}>
                <div className="carousel-wrapper">
                    <Carousel
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        emulateTouch
                        autoPlay={false}
                    >
                        {slidesData.map((s, i) => (
                            <div className="upload-card" key={s.id}>
                                <div
                                    className="upload-left"
                                    onDrop={(e) => handleDrop(i, e)}
                                    onDragOver={prevent}
                                    onDragEnter={prevent}
                                    onDragLeave={prevent}
                                >
                                    <div className="algo-meta">
                                        <div className="algo-title">{s.title}</div>
                                        <div className="algo-desc">{s.desc}</div>
                                        <div className="algo-filename">
                                            {files[i] ? (
                                                <>
                                                    <span className="file-name">{files[i].name}</span>

                                                </>
                                            ) : (
                                                <span className="file-empty">Ningún archivo seleccionado</span>
                                            )}
                                        </div>
                                    </div>

                                    <label className="upload-label" htmlFor={`file-input-${i}`}>
                                        <input
                                            id={`file-input-${i}`}
                                            type="file"
                                            accept={s.accept}
                                            className="upload-input"
                                            onChange={(e) => handleFileChange(i, e)}
                                        />
                                        <div className="upload-visual">
                                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 3v12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"
                                                      strokeLinejoin="round"/>
                                                <path d="M5 12l7-7 7 7" stroke="#fff" strokeWidth="1.6"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M21 21H3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"
                                                      strokeLinejoin="round"/>
                                            </svg>
                                            <div className="upload-cta">
                                                <div
                                                    className="upload-cta-line1">Subir {s.id.includes(".csv") ? "CSV" : "archivo"}</div>
                                                <div className="upload-cta-line2">Arrastra o haz click</div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
