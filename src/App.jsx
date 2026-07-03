// // // export default App;
// // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // import { App as AntApp, notification, Typography, Space, Button, Badge, Tooltip, Modal, Input, Select, ColorPicker, Tag, Grid } from 'antd';
// // import { 
// //   EyeOutlined, 
// //   AimOutlined, 
// //   PushpinOutlined,
// //   PlusOutlined, 
// //   CloseOutlined,
// //   BgColorsOutlined, 
// //   EditOutlined, 
// //   FontSizeOutlined, 
// //   SendOutlined,
// //   UserOutlined, 
// //   ClockCircleOutlined,
// //   LeftOutlined,
// //   RightOutlined,
// //   SaveOutlined
// // } from '@ant-design/icons';
// // import io from 'socket.io-client';

// // const { Text, Paragraph } = Typography;
// // const { TextArea } = Input;
// // const { useBreakpoint } = Grid;

// // const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

// // const fuentes = [
// //   { value: 'Arial, sans-serif', label: 'Arial' },
// //   { value: 'Georgia, serif', label: 'Georgia' },
// //   { value: "'Courier New', monospace", label: 'Courier New' },
// //   { value: "'Comic Sans MS', cursive", label: 'Comic Sans' },
// //   { value: 'Impact, sans-serif', label: 'Impact' },
// //   { value: "'Times New Roman', serif", label: 'Times New Roman' },
// //   { value: 'Verdana, sans-serif', label: 'Verdana' },
// // ];

// // function App() {
// //   const { message } = AntApp.useApp();
// //   const [api, contextHolder] = notification.useNotification();
// //   const screens = useBreakpoint();
// //   const isMobile = !screens.sm;
  
// //   const [socket, setSocket] = useState(null);
// //   const [notas, setNotas] = useState([]);
// //   const [userId, setUserId] = useState('');
// //   const [modalPublicar, setModalPublicar] = useState(false);
// //   const [modalNota, setModalNota] = useState(false);
// //   const [notaSeleccionada, setNotaSeleccionada] = useState(null);
// //   const [indiceNotaActual, setIndiceNotaActual] = useState(0);
// //   const [zoom, setZoom] = useState(1);
// //   const [posicion, setPosicion] = useState({ x: 0, y: 0 });
// //   const [arrastrando, setArrastrando] = useState(false);
// //   const [inicioArrastre, setInicioArrastre] = useState({ x: 0, y: 0 });
// //   const [notaEditando, setNotaEditando] = useState(null);
// //   const [textoEditando, setTextoEditando] = useState('');
// //   const [ultimaNotaId, setUltimaNotaId] = useState(null);
  
// //   const [nuevoTexto, setNuevoTexto] = useState('');
// //   const [nuevoColor, setNuevoColor] = useState('#FFD700');
// //   const [nuevoColorTexto, setNuevoColorTexto] = useState('#000000');
// //   const [nuevaFuente, setNuevaFuente] = useState('Arial, sans-serif');
  
// //   const tableroRef = useRef(null);
// //   const wrapperRef = useRef(null);

// //   const TABLERO_ANCHO = 2000;
// //   const TABLERO_ALTO = 1500;
// //   const TAMANO_NOTA = 160;
// //   const MARGEN_TABLERO = 10;

// //   // Inicializar usuario
// //   useEffect(() => {
// //     let savedUserId = localStorage.getItem('chismografo_userId');
// //     if (!savedUserId) {
// //       savedUserId = 'user_' + Math.random().toString(36).substr(2, 9);
// //       localStorage.setItem('chismografo_userId', savedUserId);
// //     }
// //     setUserId(savedUserId);
// //   }, []);

// //   // Conectar socket
// //   useEffect(() => {
// //     if (!userId) return;

// //     const newSocket = io(SOCKET_URL, {
// //       transports: ['websocket', 'polling'],
// //       reconnection: true,
// //       reconnectionAttempts: 10,
// //       reconnectionDelay: 1000,
// //     });

// //     setSocket(newSocket);

// //     newSocket.on('connect', () => {
// //       message.success('📢 Conectado al Chismógrafo');
// //     });

// //     newSocket.on('connect_error', () => {
// //       message.error('❌ Error de conexión');
// //     });

// //     newSocket.on('disconnect', () => {
// //       message.warning('🔌 Desconectado');
// //     });

// //     newSocket.on('notas-iniciales', (data) => {
// //       setNotas(data);
// //     });
    
// //     newSocket.on('nota-agregada', (nuevaNota) => {
// //       setNotas(prev => {
// //         const existe = prev.some(n => n.id === nuevaNota.id);
// //         if (existe) return prev;
// //         return [...prev, nuevaNota];
// //       });
// //       setUltimaNotaId(nuevaNota.id);
// //       setTimeout(() => setUltimaNotaId(null), 2500);
      
// //       if (nuevaNota.userId === userId) {
// //         message.success('✅ ¡Chisme publicado!');
// //       } else {
// //         api.info({
// //           message: '💬 ¡Nuevo chisme!',
// //           description: 'Alguien ha publicado un nuevo chisme en el tablero',
// //           placement: 'topRight',
// //           duration: 5,
// //           style: {
// //             background: 'linear-gradient(135deg, #6c63ff, #8b7fff)',
// //             color: 'white',
// //             borderRadius: '12px',
// //           },
// //         });
// //       }
// //     });

// //     newSocket.on('nota-movida', ({ id, x, y }) => {
// //       setNotas(prev => prev.map(nota => 
// //         nota.id === id ? { ...nota, x, y } : nota
// //       ));
// //     });

// //     newSocket.on('nota-editada', ({ id, texto, color, fuente, colorTexto, censurada, editado }) => {
// //       setNotas(prev => prev.map(nota => 
// //         nota.id === id ? { ...nota, texto, color, fuente, colorTexto, censurada, editado } : nota
// //       ));
// //       message.info('✏️ Nota actualizada');
// //     });

// //     newSocket.on('error', ({ mensaje }) => {
// //       message.error('❌ ' + mensaje);
// //     });

// //     return () => {
// //       newSocket.disconnect();
// //     };
// //   }, [userId, message, api]);

// //   // Generar posición cercana al centro
// //   const generarPosicion = useCallback(() => {
// //     const centroX = TABLERO_ANCHO / 2;
// //     const centroY = TABLERO_ALTO / 2;
// //     const radio = 300;
    
// //     let intentos = 0;
// //     let nuevaX, nuevaY;
    
// //     do {
// //       const angulo = Math.random() * Math.PI * 2;
// //       const distancia = Math.random() * radio;
// //       nuevaX = centroX + Math.cos(angulo) * distancia - TAMANO_NOTA / 2;
// //       nuevaY = centroY + Math.sin(angulo) * distancia - TAMANO_NOTA / 2;
      
// //       nuevaX = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ANCHO - TAMANO_NOTA - MARGEN_TABLERO, nuevaX));
// //       nuevaY = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ALTO - TAMANO_NOTA - MARGEN_TABLERO, nuevaY));
      
// //       intentos++;
// //     } while (
// //       intentos < 100 && 
// //       notas.some(n => Math.abs(n.x - nuevaX) < TAMANO_NOTA - 20 && Math.abs(n.y - nuevaY) < TAMANO_NOTA - 20)
// //     );
    
// //     return { x: nuevaX, y: nuevaY };
// //   }, [notas]);

// //   // Publicar chisme
// //   const publicarChisme = useCallback(() => {
// //     if (!socket?.connected) {
// //       message.error('❌ No hay conexión con el servidor');
// //       return;
// //     }
// //     const texto = nuevoTexto.trim();
// //     if (!texto) {
// //       message.warning('✏️ Escribe algo primero');
// //       return;
// //     }
// //     const pos = generarPosicion();
// //     socket.emit('nueva-nota', {
// //       texto,
// //       color: nuevoColor,
// //       fuente: nuevaFuente,
// //       colorTexto: nuevoColorTexto,
// //       userId,
// //       x: pos.x,
// //       y: pos.y
// //     });
// //     setNuevoTexto('');
// //     setNuevoColor('#FFD700');
// //     setNuevoColorTexto('#000000');
// //     setNuevaFuente('Arial, sans-serif');
// //     setModalPublicar(false);
// //   }, [socket, nuevoTexto, nuevoColor, nuevaFuente, nuevoColorTexto, userId, generarPosicion, message]);

// //   // Navegación de chismes
// //   const irAChismeAleatorio = useCallback(() => {
// //     if (notas.length === 0) {
// //       message.info('📢 No hay chismes aún');
// //       return;
// //     }
// //     const indiceAleatorio = Math.floor(Math.random() * notas.length);
// //     setIndiceNotaActual(indiceAleatorio);
// //     setNotaSeleccionada(notas[indiceAleatorio]);
// //     setModalNota(true);
// //   }, [notas, message]);

// //   const verNotaAnterior = useCallback(() => {
// //     if (notas.length === 0) return;
// //     const nuevoIndice = indiceNotaActual > 0 ? indiceNotaActual - 1 : notas.length - 1;
// //     setIndiceNotaActual(nuevoIndice);
// //     setNotaSeleccionada(notas[nuevoIndice]);
// //   }, [notas, indiceNotaActual]);

// //   const verNotaSiguiente = useCallback(() => {
// //     if (notas.length === 0) return;
// //     const nuevoIndice = indiceNotaActual < notas.length - 1 ? indiceNotaActual + 1 : 0;
// //     setIndiceNotaActual(nuevoIndice);
// //     setNotaSeleccionada(notas[nuevoIndice]);
// //   }, [notas, indiceNotaActual]);

// //   const centrarTablero = useCallback(() => {
// //     setPosicion({ x: 0, y: 0 });
// //     setZoom(1);
// //     message.success('🎯 Tablero centrado');
// //   }, [message]);

// //   // Arrastre del tablero
// //   const iniciarArrastre = useCallback((e) => {
// //     if (e.target.closest('.nota-item')) return;
// //     if (e.button !== undefined && e.button !== 0) return;
    
// //     const touch = e.touches?.[0] || e;
// //     setArrastrando(true);
// //     setInicioArrastre({
// //       x: touch.clientX - posicion.x,
// //       y: touch.clientY - posicion.y
// //     });
// //   }, [posicion]);

// //   const moverArrastre = useCallback((e) => {
// //     if (!arrastrando) return;
// //     e.preventDefault();
    
// //     const touch = e.touches?.[0] || e;
// //     let nuevaX = touch.clientX - inicioArrastre.x;
// //     let nuevaY = touch.clientY - inicioArrastre.y;
    
// //     const wrapper = wrapperRef.current;
// //     if (wrapper) {
// //       const w = wrapper.clientWidth;
// //       const h = wrapper.clientHeight;
// //       const maxX = Math.max(0, TABLERO_ANCHO * zoom - w);
// //       const maxY = Math.max(0, TABLERO_ALTO * zoom - h);
// //       nuevaX = Math.max(-maxX, Math.min(0, nuevaX));
// //       nuevaY = Math.max(-maxY, Math.min(0, nuevaY));
// //     }
    
// //     setPosicion({ x: nuevaX, y: nuevaY });
// //   }, [arrastrando, inicioArrastre, zoom]);

// //   const terminarArrastre = useCallback(() => {
// //     setArrastrando(false);
// //   }, []);

// //   // Arrastre de nota
// //   const iniciarArrastreNota = useCallback((e, nota) => {
// //     if (nota.userId !== userId) {
// //       message.warning('🔒 Solo puedes mover tus propios chismes');
// //       return;
// //     }
    
// //     e.stopPropagation();
// //     e.preventDefault();
    
// //     const touch = e.touches?.[0] || e;
// //     const tablero = tableroRef.current;
// //     if (!tablero) return;
    
// //     const rect = tablero.getBoundingClientRect();
// //     const offsetX = touch.clientX - rect.left - (nota.x * zoom);
// //     const offsetY = touch.clientY - rect.top - (nota.y * zoom);

// //     const onMove = (ev) => {
// //       ev.preventDefault();
// //       const t = ev.touches?.[0] || ev;
// //       let nx = (t.clientX - rect.left - offsetX) / zoom;
// //       let ny = (t.clientY - rect.top - offsetY) / zoom;
      
// //       nx = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ANCHO - TAMANO_NOTA - MARGEN_TABLERO, nx));
// //       ny = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ALTO - TAMANO_NOTA - MARGEN_TABLERO, ny));
      
// //       const colision = notas.some(n => 
// //         n.id !== nota.id && 
// //         Math.abs(n.x - nx) < TAMANO_NOTA - 30 && 
// //         Math.abs(n.y - ny) < TAMANO_NOTA - 30
// //       );
      
// //       if (!colision) {
// //         socket?.emit('mover-nota', { id: nota.id, x: nx, y: ny, userId });
// //       }
// //     };

// //     const onEnd = () => {
// //       document.removeEventListener('mousemove', onMove);
// //       document.removeEventListener('mouseup', onEnd);
// //       document.removeEventListener('touchmove', onMove);
// //       document.removeEventListener('touchend', onEnd);
// //     };

// //     document.addEventListener('mousemove', onMove);
// //     document.addEventListener('mouseup', onEnd);
// //     document.addEventListener('touchmove', onMove, { passive: false });
// //     document.addEventListener('touchend', onEnd);
// //   }, [userId, zoom, socket, notas, message]);

// //   const guardarEdicion = useCallback((id) => {
// //     const nota = notas.find(n => n.id === id);
// //     if (!nota || !textoEditando.trim()) return;
    
// //     socket?.emit('editar-nota', {
// //       id,
// //       texto: textoEditando.trim(),
// //       color: nota.color,
// //       fuente: nota.fuente,
// //       colorTexto: nota.colorTexto,
// //       userId
// //     });
    
// //     setNotaEditando(null);
// //     setTextoEditando('');
// //   }, [notas, textoEditando, socket, userId]);

// //   const verNota = useCallback((nota) => {
// //     const indice = notas.findIndex(n => n.id === nota.id);
// //     setIndiceNotaActual(indice >= 0 ? indice : 0);
// //     setNotaSeleccionada(nota);
// //     setModalNota(true);
// //   }, [notas]);

// //   // Zoom
// //   useEffect(() => {
// //     const manejarZoom = (e) => {
// //       if (e.ctrlKey || e.metaKey) {
// //         e.preventDefault();
// //         const delta = e.deltaY > 0 ? 0.92 : 1.08;
// //         setZoom(prev => {
// //           const newZoom = prev * delta;
// //           return Math.min(Math.max(newZoom, 0.3), 2);
// //         });
// //       }
// //     };

// //     const wrapper = wrapperRef.current;
// //     if (wrapper) {
// //       wrapper.addEventListener('wheel', manejarZoom, { passive: false });
// //     }
    
// //     return () => {
// //       if (wrapper) {
// //         wrapper.removeEventListener('wheel', manejarZoom);
// //       }
// //     };
// //   }, []);

// //   return (
// //     <div className="app-layout">
// //       {contextHolder}

// //       {/* ===== NAVBAR ===== */}
// //       <nav className="app-navbar">
// //         <div className="app-navbar-inner">
// //           <div className="app-brand">
// //             <Text strong className="app-title">📢 Chismógrafo</Text>
// //             <span className="app-subtitle">Proyelco</span>
// //           </div>
          
// //           <Space size="small">
// //             <Tooltip title="Leer chisme aleatorio">
// //               <Button type="text" icon={<EyeOutlined />} onClick={irAChismeAleatorio} size="small">
// //                 {!isMobile && <span style={{ marginLeft: 4 }}>Leer chisme</span>}
// //               </Button>
// //             </Tooltip>
            
// //             <Tooltip title="Centrar tablero">
// //               <Button type="text" icon={<AimOutlined />} onClick={centrarTablero} size="small" />
// //             </Tooltip>
            
// //             <Tooltip title={`${notas.length} chismes`}>
// //               <Badge count={notas.length} showZero size="small">
// //                 <Button type="text" icon={<PushpinOutlined />} size="small" />
// //               </Badge>
// //             </Tooltip>
// //           </Space>
// //         </div>
// //       </nav>

// //       {/* ===== TABLERO ===== */}
// //       <main 
// //         className="app-tablero"
// //         ref={wrapperRef}
// //         onMouseDown={iniciarArrastre}
// //         onMouseMove={moverArrastre}
// //         onMouseUp={terminarArrastre}
// //         onMouseLeave={terminarArrastre}
// //         onTouchStart={iniciarArrastre}
// //         onTouchMove={moverArrastre}
// //         onTouchEnd={terminarArrastre}
// //       >
// //         <div 
// //           ref={tableroRef}
// //           className="tablero-canvas"
// //           style={{
// //             transform: `translate(${posicion.x}px, ${posicion.y}px) scale(${zoom})`,
// //             width: TABLERO_ANCHO,
// //             height: TABLERO_ALTO,
// //             transition: arrastrando ? 'none' : 'transform 0.1s ease-out'
// //           }}
// //         >
// //           <div className="tablero-grid" />
          
// //           <div className="tablero-border left" />
// //           <div className="tablero-border right" />
// //           <div className="tablero-border top" />
// //           <div className="tablero-border bottom" />
// //           <div className="tablero-corner tl" />
// //           <div className="tablero-corner tr" />
// //           <div className="tablero-corner bl" />
// //           <div className="tablero-corner br" />

// //           {notas.length === 0 ? (
// //             <div className="tablero-empty">
// //               <div className="tablero-empty-icon">📢</div>
// //               <Text type="secondary" style={{ fontSize: '1rem' }}>No hay chismes aún</Text>
// //               <br />
// //               <Text type="secondary" style={{ fontSize: '0.85rem' }}>¡Sé el primero en publicar!</Text>
// //             </div>
// //           ) : (
// //             notas.map((nota) => {
// //               const esMia = nota.userId === userId;
// //               const esNueva = ultimaNotaId === nota.id;
// //               const estaEditando = notaEditando === nota.id;

// //               return (
// //                 <div
// //                   key={nota.id}
// //                   className={`nota-item ${esMia ? 'nota-mia' : ''} ${esNueva ? 'nota-nueva' : ''}`}
// //                   style={{
// //                     left: nota.x || 50,
// //                     top: nota.y || 50,
// //                     backgroundColor: nota.color || '#FFD700',
// //                     fontFamily: nota.fuente || 'Arial, sans-serif',
// //                     color: nota.colorTexto || '#000000',
// //                     cursor: esMia ? 'grab' : 'pointer'
// //                   }}
// //                   onMouseDown={(e) => esMia && iniciarArrastreNota(e, nota)}
// //                   onTouchStart={(e) => esMia && iniciarArrastreNota(e, nota)}
// //                   onClick={() => !estaEditando && verNota(nota)}
// //                   onDoubleClick={(e) => {
// //                     e.stopPropagation();
// //                     if (esMia && !estaEditando) {
// //                       setNotaEditando(nota.id);
// //                       setTextoEditando(nota.texto);
// //                     }
// //                   }}
// //                 >
// //                   {esMia && <span className="nota-indicator">●</span>}
                  
// //                   {estaEditando ? (
// //                     <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%', paddingTop: 4 }}>
// //                       <TextArea
// //                         value={textoEditando}
// //                         onChange={(e) => setTextoEditando(e.target.value)}
// //                         onKeyDown={(e) => {
// //                           if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
// //                             e.preventDefault();
// //                             guardarEdicion(nota.id);
// //                           }
// //                           if (e.key === 'Escape') {
// //                             setNotaEditando(null);
// //                             setTextoEditando('');
// //                           }
// //                         }}
// //                         autoFocus
// //                         style={{
// //                           flex: 1,
// //                           borderRadius: 8,
// //                           fontSize: '0.875rem',
// //                           backgroundColor: nota.color,
// //                           color: nota.colorTexto,
// //                           fontFamily: nota.fuente,
// //                           borderColor: 'rgba(108, 99, 255, 0.4)',
// //                           minHeight: 60
// //                         }}
// //                         rows={3}
// //                         maxLength={200}
// //                         onClick={(e) => e.stopPropagation()}
// //                       />
// //                       <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
// //                         <Button size="small" type="primary" icon={<SaveOutlined />} onClick={() => guardarEdicion(nota.id)} disabled={!textoEditando.trim()}>
// //                           Guardar
// //                         </Button>
// //                         <Button size="small" danger icon={<CloseOutlined />} onClick={() => { setNotaEditando(null); setTextoEditando(''); }}>
// //                           Cancelar
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <>
// //                       <div className="nota-handle">{esMia ? '⠿' : '🔒'}</div>
// //                       <p className="nota-texto">{nota.texto}</p>
// //                       <div className="nota-footer">
// //                         <span className="nota-timestamp">
// //                           {new Date(nota.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                         </span>
// //                       </div>
// //                     </>
// //                   )}
// //                 </div>
// //               );
// //             })
// //           )}
// //         </div>
// //       </main>

// //       {/* ===== INFO TABLERO (FLOTANTE) ===== */}
// //       <div className="app-info">
// //         <span>📌 {notas.length} chismes</span>
// //         <span>🔍 {Math.round(zoom * 100)}%</span>
// //         <span className="app-info-highlight">● {notas.filter(n => n.userId === userId).length} tuyos</span>
// //       </div>

// //       {/* ===== BOTÓN FLOTANTE PERSONALIZADO - SIEMPRE VISIBLE ===== */}
// //       <button 
// //         className="app-fab-custom"
// //         onClick={() => setModalPublicar(!modalPublicar)}
// //         aria-label={modalPublicar ? 'Cerrar' : 'Nuevo chisme'}
// //       >
// //         {modalPublicar ? <CloseOutlined /> : <PlusOutlined />}
// //       </button>

// //       {/* ===== MODAL PUBLICAR ===== */}
// //       <Modal
// //         open={modalPublicar}
// //         onCancel={() => setModalPublicar(false)}
// //         footer={null}
// //         closable={false}
// //         centered
// //         width={isMobile ? '95%' : 420}
// //         destroyOnClose
// //         styles={{ body: { padding: isMobile ? 16 : 24, maxHeight: isMobile ? '80vh' : 'auto', overflowY: 'auto' } }}
// //       >
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <Text strong style={{ fontSize: isMobile ? 16 : 18 }}>📝 Nuevo chisme</Text>
// //             <Button type="text" icon={<CloseOutlined />} onClick={() => setModalPublicar(false)} size={isMobile ? 'small' : 'middle'} />
// //           </div>

// //           <TextArea
// //             placeholder="¿Qué chisme tienes para contar?"
// //             value={nuevoTexto}
// //             onChange={(e) => setNuevoTexto(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
// //                 e.preventDefault();
// //                 publicarChisme();
// //               }
// //             }}
// //             maxLength={200}
// //             rows={isMobile ? 3 : 4}
// //             style={{ borderRadius: 12 }}
// //             autoFocus
// //             showCount={{ formatter: ({ count, maxLength }) => `${count}/${maxLength}` }}
// //           />

// //           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8 }}>
// //             <div className="modal-controls">
// //               <BgColorsOutlined style={{ color: '#6b7280', fontSize: 14 }} />
// //               <span className="modal-controls-label">Fondo</span>
// //               <ColorPicker value={nuevoColor} onChange={(c) => setNuevoColor(c.toHexString())} size={isMobile ? 'small' : 'middle'} />
// //             </div>
            
// //             <div className="modal-controls">
// //               <EditOutlined style={{ color: '#6b7280', fontSize: 14 }} />
// //               <span className="modal-controls-label">Texto</span>
// //               <ColorPicker value={nuevoColorTexto} onChange={(c) => setNuevoColorTexto(c.toHexString())} size={isMobile ? 'small' : 'middle'} />
// //             </div>
            
// //             <div className="modal-controls" style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
// //               <FontSizeOutlined style={{ color: '#6b7280', fontSize: 14 }} />
// //               <Select
// //                 value={nuevaFuente}
// //                 onChange={setNuevaFuente}
// //                 options={fuentes}
// //                 style={{ flex: 1 }}
// //                 size={isMobile ? 'small' : 'middle'}
// //                 bordered={false}
// //               />
// //             </div>
// //           </div>

// //           <Button
// //             type="primary"
// //             block
// //             size={isMobile ? 'middle' : 'large'}
// //             onClick={publicarChisme}
// //             disabled={!nuevoTexto.trim()}
// //             className="modal-publicar-btn"
// //             icon={<SendOutlined />}
// //           >
// //             Publicar chisme
// //           </Button>
          
// //           <Text style={{ textAlign: 'center', fontSize: isMobile ? 10 : 12, color: '#9ca3af', opacity: 0.6 }}>
// //             Ctrl + Enter para publicar rápido
// //           </Text>
// //         </div>
// //       </Modal>

// //       {/* ===== MODAL VER NOTA ===== */}
// //       <Modal
// //         open={modalNota}
// //         onCancel={() => setModalNota(false)}
// //         footer={null}
// //         closable={false}
// //         centered
// //         width={isMobile ? '95%' : 500}
// //         destroyOnClose
// //         styles={{ body: { padding: 0 } }}
// //       >
// //         {notaSeleccionada && (
// //           <div style={{ position: 'relative' }}>
// //             {/* Botón cerrar */}
// //             <button className="modal-close-btn" onClick={() => setModalNota(false)}>
// //               <CloseOutlined style={{ color: '#4b5563' }} />
// //             </button>

// //             {/* Flechas de navegación */}
// //             {notas.length > 1 && (
// //               <>
// //                 <button
// //                   className="modal-nota-nav-btn"
// //                   style={{ left: isMobile ? 8 : -50 }}
// //                   onClick={verNotaAnterior}
// //                 >
// //                   <LeftOutlined style={{ fontSize: 20 }} />
// //                 </button>
// //                 <button
// //                   className="modal-nota-nav-btn"
// //                   style={{ right: isMobile ? 8 : -50 }}
// //                   onClick={verNotaSiguiente}
// //                 >
// //                   <RightOutlined style={{ fontSize: 20 }} />
// //                 </button>
// //               </>
// //             )}

// //             {/* Contenido de la nota */}
// //             <div 
// //               className="modal-nota-content"
// //               style={{
// //                 backgroundColor: notaSeleccionada.color || '#FFD700',
// //                 color: notaSeleccionada.colorTexto || '#000000',
// //                 fontFamily: notaSeleccionada.fuente || 'Arial, sans-serif',
// //                 padding: isMobile ? '48px 24px 24px' : '56px 32px 32px',
// //                 minHeight: isMobile ? 200 : 250,
// //               }}
// //             >
// //               {/* Contador */}
// //               {notas.length > 1 && (
// //                 <div className="modal-nota-counter">
// //                   {indiceNotaActual + 1} / {notas.length}
// //                 </div>
// //               )}

// //               {/* Tags */}
// //               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, marginTop: notas.length > 1 ? 20 : 0 }}>
// //                 {notaSeleccionada.userId === userId && (
// //                   <Tag color="purple" style={{ borderRadius: 12, fontSize: 12 }}>● Tu chisme</Tag>
// //                 )}
// //                 {notaSeleccionada.censurada && (
// //                   <Tag color="red" style={{ borderRadius: 12, fontSize: 12 }}>🔞 Censurada</Tag>
// //                 )}
// //                 {notaSeleccionada.editado && (
// //                   <Tag color="blue" style={{ borderRadius: 12, fontSize: 12 }}>✏️ Editado</Tag>
// //                 )}
// //               </div>
              
// //               {/* Texto */}
// //               <Paragraph style={{ fontSize: isMobile ? 18 : 24, lineHeight: 1.6, marginBottom: 24, wordBreak: 'break-word' }}>
// //                 {notaSeleccionada.texto}
// //               </Paragraph>
              
// //               {/* Footer */}
// //               <div style={{ 
// //                 display: 'flex', 
// //                 flexDirection: isMobile ? 'column' : 'row', 
// //                 justifyContent: 'space-between', 
// //                 alignItems: isMobile ? 'flex-start' : 'center', 
// //                 gap: 8, 
// //                 paddingTop: 16, 
// //                 borderTop: '1px solid rgba(255,255,255,0.2)' 
// //               }}>
// //                 <Text style={{ fontSize: 12, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
// //                   <ClockCircleOutlined />
// //                   {new Date(notaSeleccionada.timestamp).toLocaleString('es-ES', {
// //                     day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
// //                   })}
// //                 </Text>
// //                 <Text style={{ fontSize: 12, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
// //                   <UserOutlined />
// //                   {notaSeleccionada.userId === userId ? 'Tú' : 'Anónimo'}
// //                 </Text>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { App as AntApp, notification, Typography, Space, Button, Badge, Tooltip, Modal, Input, Select, ColorPicker, Tag, Grid, Popover } from 'antd';
// import { 
//   EyeOutlined, 
//   AimOutlined, 
//   PushpinOutlined,
//   PlusOutlined, 
//   CloseOutlined,
//   BgColorsOutlined, 
//   EditOutlined, 
//   FontSizeOutlined, 
//   SendOutlined,
//   UserOutlined, 
//   ClockCircleOutlined,
//   LeftOutlined,
//   RightOutlined,
//   SaveOutlined
// } from '@ant-design/icons';
// import io from 'socket.io-client';

// const { Text, Paragraph } = Typography;
// const { TextArea } = Input;
// const { useBreakpoint } = Grid;

// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

// const fuentes = [
//   { value: 'Arial, sans-serif', label: 'Arial' },
//   { value: 'Georgia, serif', label: 'Georgia' },
//   { value: "'Courier New', monospace", label: 'Courier New' },
//   { value: "'Comic Sans MS', cursive", label: 'Comic Sans' },
//   { value: 'Impact, sans-serif', label: 'Impact' },
//   { value: "'Times New Roman', serif", label: 'Times New Roman' },
//   { value: 'Verdana, sans-serif', label: 'Verdana' },
// ];

// // REACCIONES
// const REACCIONES = [
//   { emoji: '😂', label: 'Risa', key: 'risa' },
//   { emoji: '❤️', label: 'Corazón', key: 'corazon' },
//   { emoji: '😡', label: 'Enojo', key: 'enojo' },
//   { emoji: '🔗', label: 'Link', key: 'link' },
// ];

// function App() {
//   const { message } = AntApp.useApp();
//   const [api, contextHolder] = notification.useNotification();
//   const screens = useBreakpoint();
//   const isMobile = !screens.sm;
  
//   const [socket, setSocket] = useState(null);
//   const [notas, setNotas] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [modalPublicar, setModalPublicar] = useState(false);
//   const [modalNota, setModalNota] = useState(false);
//   const [notaSeleccionada, setNotaSeleccionada] = useState(null);
//   const [indiceNotaActual, setIndiceNotaActual] = useState(0);
//   const [zoom, setZoom] = useState(1);
//   const [posicion, setPosicion] = useState({ x: 0, y: 0 });
//   const [arrastrando, setArrastrando] = useState(false);
//   const [inicioArrastre, setInicioArrastre] = useState({ x: 0, y: 0 });
//   const [notaEditando, setNotaEditando] = useState(null);
//   const [textoEditando, setTextoEditando] = useState('');
//   const [ultimaNotaId, setUltimaNotaId] = useState(null);
  
//   const [nuevoTexto, setNuevoTexto] = useState('');
//   const [nuevoColor, setNuevoColor] = useState('#FFD700');
//   const [nuevoColorTexto, setNuevoColorTexto] = useState('#000000');
//   const [nuevaFuente, setNuevaFuente] = useState('Arial, sans-serif');
  
//   const tableroRef = useRef(null);
//   const wrapperRef = useRef(null);

//   const TABLERO_ANCHO = 2000;
//   const TABLERO_ALTO = 1500;
//   const TAMANO_NOTA = 160;
//   const MARGEN_TABLERO = 10;

//   // Inicializar usuario
//   useEffect(() => {
//     let savedUserId = localStorage.getItem('chismografo_userId');
//     if (!savedUserId) {
//       savedUserId = 'user_' + Math.random().toString(36).substr(2, 9);
//       localStorage.setItem('chismografo_userId', savedUserId);
//     }
//     setUserId(savedUserId);
//   }, []);

//   // Conectar socket
//   useEffect(() => {
//     if (!userId) return;

//     const newSocket = io(SOCKET_URL, {
//       transports: ['websocket', 'polling'],
//       reconnection: true,
//       reconnectionAttempts: 10,
//       reconnectionDelay: 1000,
//     });

//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       message.success('📢 Conectado al Chismógrafo');
//     });

//     newSocket.on('connect_error', () => {
//       message.error('❌ Error de conexión');
//     });

//     newSocket.on('disconnect', () => {
//       message.warning('🔌 Desconectado');
//     });

//     newSocket.on('notas-iniciales', (data) => {
//       setNotas(data);
//     });
    
//     newSocket.on('nota-agregada', (nuevaNota) => {
//       setNotas(prev => {
//         const existe = prev.some(n => n.id === nuevaNota.id);
//         if (existe) return prev;
//         return [...prev, nuevaNota];
//       });
//       setUltimaNotaId(nuevaNota.id);
//       setTimeout(() => setUltimaNotaId(null), 2500);
      
//       if (nuevaNota.userId === userId) {
//         message.success('✅ ¡Chisme publicado!');
//       } else {
//         api.info({
//           message: '💬 ¡Nuevo chisme!',
//           description: 'Alguien ha publicado un nuevo chisme en el tablero',
//           placement: 'topRight',
//           duration: 5,
//           style: {
//             background: 'linear-gradient(135deg, #6c63ff, #8b7fff)',
//             color: 'white',
//             borderRadius: '12px',
//           },
//         });
//       }
//     });

//     newSocket.on('nota-movida', ({ id, x, y }) => {
//       setNotas(prev => prev.map(nota => 
//         nota.id === id ? { ...nota, x, y } : nota
//       ));
//     });

//     newSocket.on('nota-editada', ({ id, texto, color, fuente, colorTexto, censurada, editado }) => {
//       setNotas(prev => prev.map(nota => 
//         nota.id === id ? { ...nota, texto, color, fuente, colorTexto, censurada, editado } : nota
//       ));
//       message.info('✏️ Nota actualizada');
//     });

//     // ===== REACCIÓN EN TIEMPO REAL =====
//     newSocket.on('nota-reaccionada', ({ id, reacciones }) => {
//       setNotas(prev => prev.map(nota => 
//         nota.id === id ? { ...nota, reacciones } : nota
//       ));
//     });

//     newSocket.on('error', ({ mensaje }) => {
//       message.error('❌ ' + mensaje);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [userId, message, api]);

//   // Generar posición cercana al centro
//   const generarPosicion = useCallback(() => {
//     const centroX = TABLERO_ANCHO / 2;
//     const centroY = TABLERO_ALTO / 2;
//     const radio = 300;
    
//     let intentos = 0;
//     let nuevaX, nuevaY;
    
//     do {
//       const angulo = Math.random() * Math.PI * 2;
//       const distancia = Math.random() * radio;
//       nuevaX = centroX + Math.cos(angulo) * distancia - TAMANO_NOTA / 2;
//       nuevaY = centroY + Math.sin(angulo) * distancia - TAMANO_NOTA / 2;
      
//       nuevaX = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ANCHO - TAMANO_NOTA - MARGEN_TABLERO, nuevaX));
//       nuevaY = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ALTO - TAMANO_NOTA - MARGEN_TABLERO, nuevaY));
      
//       intentos++;
//     } while (
//       intentos < 100 && 
//       notas.some(n => Math.abs(n.x - nuevaX) < TAMANO_NOTA - 20 && Math.abs(n.y - nuevaY) < TAMANO_NOTA - 20)
//     );
    
//     return { x: nuevaX, y: nuevaY };
//   }, [notas]);

//   // Publicar chisme
//   const publicarChisme = useCallback(() => {
//     if (!socket?.connected) {
//       message.error('❌ No hay conexión con el servidor');
//       return;
//     }
//     const texto = nuevoTexto.trim();
//     if (!texto) {
//       message.warning('✏️ Escribe algo primero');
//       return;
//     }
//     const pos = generarPosicion();
//     socket.emit('nueva-nota', {
//       texto,
//       color: nuevoColor,
//       fuente: nuevaFuente,
//       colorTexto: nuevoColorTexto,
//       userId,
//       x: pos.x,
//       y: pos.y
//     });
//     setNuevoTexto('');
//     setNuevoColor('#FFD700');
//     setNuevoColorTexto('#000000');
//     setNuevaFuente('Arial, sans-serif');
//     setModalPublicar(false);
//   }, [socket, nuevoTexto, nuevoColor, nuevaFuente, nuevoColorTexto, userId, generarPosicion, message]);

//   // ===== REACCIÓN =====
//   const handleReaccion = useCallback((notaId, reaccionKey) => {
//     if (!socket?.connected) {
//       message.error('❌ No hay conexión');
//       return;
//     }
//     socket.emit('reaccionar-nota', { 
//       id: notaId, 
//       reaccion: reaccionKey,
//       userId 
//     });
//   }, [socket, userId, message]);

//   // Navegación de chismes
//   const irAChismeAleatorio = useCallback(() => {
//     if (notas.length === 0) {
//       message.info('📢 No hay chismes aún');
//       return;
//     }
//     const indiceAleatorio = Math.floor(Math.random() * notas.length);
//     setIndiceNotaActual(indiceAleatorio);
//     setNotaSeleccionada(notas[indiceAleatorio]);
//     setModalNota(true);
//   }, [notas, message]);

//   const verNotaAnterior = useCallback(() => {
//     if (notas.length === 0) return;
//     const nuevoIndice = indiceNotaActual > 0 ? indiceNotaActual - 1 : notas.length - 1;
//     setIndiceNotaActual(nuevoIndice);
//     setNotaSeleccionada(notas[nuevoIndice]);
//   }, [notas, indiceNotaActual]);

//   const verNotaSiguiente = useCallback(() => {
//     if (notas.length === 0) return;
//     const nuevoIndice = indiceNotaActual < notas.length - 1 ? indiceNotaActual + 1 : 0;
//     setIndiceNotaActual(nuevoIndice);
//     setNotaSeleccionada(notas[nuevoIndice]);
//   }, [notas, indiceNotaActual]);

//   const centrarTablero = useCallback(() => {
//     setPosicion({ x: 0, y: 0 });
//     setZoom(1);
//     message.success('🎯 Tablero centrado');
//   }, [message]);

//   // Arrastre del tablero
//   const iniciarArrastre = useCallback((e) => {
//     if (e.target.closest('.nota-item')) return;
//     if (e.button !== undefined && e.button !== 0) return;
    
//     const touch = e.touches?.[0] || e;
//     setArrastrando(true);
//     setInicioArrastre({
//       x: touch.clientX - posicion.x,
//       y: touch.clientY - posicion.y
//     });
//   }, [posicion]);

//   const moverArrastre = useCallback((e) => {
//     if (!arrastrando) return;
//     e.preventDefault();
    
//     const touch = e.touches?.[0] || e;
//     let nuevaX = touch.clientX - inicioArrastre.x;
//     let nuevaY = touch.clientY - inicioArrastre.y;
    
//     const wrapper = wrapperRef.current;
//     if (wrapper) {
//       const w = wrapper.clientWidth;
//       const h = wrapper.clientHeight;
//       const maxX = Math.max(0, TABLERO_ANCHO * zoom - w);
//       const maxY = Math.max(0, TABLERO_ALTO * zoom - h);
//       nuevaX = Math.max(-maxX, Math.min(0, nuevaX));
//       nuevaY = Math.max(-maxY, Math.min(0, nuevaY));
//     }
    
//     setPosicion({ x: nuevaX, y: nuevaY });
//   }, [arrastrando, inicioArrastre, zoom]);

//   const terminarArrastre = useCallback(() => {
//     setArrastrando(false);
//   }, []);

//   // Arrastre de nota
//   const iniciarArrastreNota = useCallback((e, nota) => {
//     if (nota.userId !== userId) {
//       message.warning('🔒 Solo puedes mover tus propios chismes');
//       return;
//     }
    
//     e.stopPropagation();
//     e.preventDefault();
    
//     const touch = e.touches?.[0] || e;
//     const tablero = tableroRef.current;
//     if (!tablero) return;
    
//     const rect = tablero.getBoundingClientRect();
//     const offsetX = touch.clientX - rect.left - (nota.x * zoom);
//     const offsetY = touch.clientY - rect.top - (nota.y * zoom);

//     const onMove = (ev) => {
//       ev.preventDefault();
//       const t = ev.touches?.[0] || ev;
//       let nx = (t.clientX - rect.left - offsetX) / zoom;
//       let ny = (t.clientY - rect.top - offsetY) / zoom;
      
//       nx = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ANCHO - TAMANO_NOTA - MARGEN_TABLERO, nx));
//       ny = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ALTO - TAMANO_NOTA - MARGEN_TABLERO, ny));
      
//       const colision = notas.some(n => 
//         n.id !== nota.id && 
//         Math.abs(n.x - nx) < TAMANO_NOTA - 30 && 
//         Math.abs(n.y - ny) < TAMANO_NOTA - 30
//       );
      
//       if (!colision) {
//         socket?.emit('mover-nota', { id: nota.id, x: nx, y: ny, userId });
//       }
//     };

//     const onEnd = () => {
//       document.removeEventListener('mousemove', onMove);
//       document.removeEventListener('mouseup', onEnd);
//       document.removeEventListener('touchmove', onMove);
//       document.removeEventListener('touchend', onEnd);
//     };

//     document.addEventListener('mousemove', onMove);
//     document.addEventListener('mouseup', onEnd);
//     document.addEventListener('touchmove', onMove, { passive: false });
//     document.addEventListener('touchend', onEnd);
//   }, [userId, zoom, socket, notas, message]);

//   // Guardar edición
//   const guardarEdicion = useCallback((id) => {
//     const nota = notas.find(n => n.id === id);
//     if (!nota || !textoEditando.trim()) return;
    
//     socket?.emit('editar-nota', {
//       id,
//       texto: textoEditando.trim(),
//       color: nota.color,
//       fuente: nota.fuente,
//       colorTexto: nota.colorTexto,
//       userId
//     });
    
//     setNotaEditando(null);
//     setTextoEditando('');
//   }, [notas, textoEditando, socket, userId]);

//   // Ver nota en modal
//   const verNota = useCallback((nota) => {
//     const indice = notas.findIndex(n => n.id === nota.id);
//     setIndiceNotaActual(indice >= 0 ? indice : 0);
//     setNotaSeleccionada(nota);
//     setModalNota(true);
//   }, [notas]);

//   // Zoom
//   useEffect(() => {
//     const manejarZoom = (e) => {
//       if (e.ctrlKey || e.metaKey) {
//         e.preventDefault();
//         const delta = e.deltaY > 0 ? 0.92 : 1.08;
//         setZoom(prev => {
//           const newZoom = prev * delta;
//           return Math.min(Math.max(newZoom, 0.3), 2);
//         });
//       }
//     };

//     const wrapper = wrapperRef.current;
//     if (wrapper) {
//       wrapper.addEventListener('wheel', manejarZoom, { passive: false });
//     }
    
//     return () => {
//       if (wrapper) {
//         wrapper.removeEventListener('wheel', manejarZoom);
//       }
//     };
//   }, []);

//   // Renderizar reacciones de una nota
//   const renderReacciones = (nota) => {
//     if (!nota.reacciones || Object.keys(nota.reacciones).length === 0) return null;
    
//     return (
//       <div className="nota-reacciones">
//         {REACCIONES.map(({ emoji, key }) => {
//           const count = nota.reacciones[key]?.length || 0;
//           if (count === 0) return null;
//           const estaActiva = nota.reacciones[key]?.includes(userId) || false;
//           return (
//             <span 
//               key={key}
//               className={`nota-reaccion ${estaActiva ? 'activa' : ''}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleReaccion(nota.id, key);
//               }}
//             >
//               {emoji} {count}
//             </span>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="app-layout">
//       {contextHolder}

//       {/* ===== NAVBAR ===== */}
//       <nav className="app-navbar">
//         <div className="app-navbar-inner">
//           <div className="app-brand">
//             <Text strong className="app-title">📢 Chismógrafo</Text>
//             <span className="app-subtitle">Proyelco</span>
//           </div>
          
//           <Space size="small">
//             <Tooltip title="Leer chisme aleatorio">
//               <Button type="text" icon={<EyeOutlined />} onClick={irAChismeAleatorio} size="small">
//                 {!isMobile && <span style={{ marginLeft: 4 }}>Leer chisme</span>}
//               </Button>
//             </Tooltip>
            
//             <Tooltip title="Centrar tablero">
//               <Button type="text" icon={<AimOutlined />} onClick={centrarTablero} size="small" />
//             </Tooltip>
            
//             <Tooltip title={`${notas.length} chismes`}>
//               <Badge count={notas.length} showZero size="small">
//                 <Button type="text" icon={<PushpinOutlined />} size="small" />
//               </Badge>
//             </Tooltip>
//           </Space>
//         </div>
//       </nav>

//       {/* ===== TABLERO ===== */}
//       <main 
//         className="app-tablero"
//         ref={wrapperRef}
//         onMouseDown={iniciarArrastre}
//         onMouseMove={moverArrastre}
//         onMouseUp={terminarArrastre}
//         onMouseLeave={terminarArrastre}
//         onTouchStart={iniciarArrastre}
//         onTouchMove={moverArrastre}
//         onTouchEnd={terminarArrastre}
//       >
//         <div 
//           ref={tableroRef}
//           className="tablero-canvas"
//           style={{
//             transform: `translate(${posicion.x}px, ${posicion.y}px) scale(${zoom})`,
//             width: TABLERO_ANCHO,
//             height: TABLERO_ALTO,
//             transition: arrastrando ? 'none' : 'transform 0.1s ease-out'
//           }}
//         >
//           <div className="tablero-grid" />
          
//           <div className="tablero-border left" />
//           <div className="tablero-border right" />
//           <div className="tablero-border top" />
//           <div className="tablero-border bottom" />
//           <div className="tablero-corner tl" />
//           <div className="tablero-corner tr" />
//           <div className="tablero-corner bl" />
//           <div className="tablero-corner br" />

//           {notas.length === 0 ? (
//             <div className="tablero-empty">
//               <div className="tablero-empty-icon">📢</div>
//               <Text type="secondary" style={{ fontSize: '1rem' }}>No hay chismes aún</Text>
//               <br />
//               <Text type="secondary" style={{ fontSize: '0.85rem' }}>¡Sé el primero en publicar!</Text>
//             </div>
//           ) : (
//             notas.map((nota) => {
//               const esMia = nota.userId === userId;
//               const esNueva = ultimaNotaId === nota.id;
//               const estaEditando = notaEditando === nota.id;

//               return (
//                 <div
//                   key={nota.id}
//                   className={`nota-item ${esMia ? 'nota-mia' : ''} ${esNueva ? 'nota-nueva' : ''}`}
//                   style={{
//                     left: nota.x || 50,
//                     top: nota.y || 50,
//                     backgroundColor: nota.color || '#FFD700',
//                     fontFamily: nota.fuente || 'Arial, sans-serif',
//                     color: nota.colorTexto || '#000000',
//                     cursor: esMia ? 'grab' : 'pointer'
//                   }}
//                   onMouseDown={(e) => esMia && iniciarArrastreNota(e, nota)}
//                   onTouchStart={(e) => esMia && iniciarArrastreNota(e, nota)}
//                   onClick={() => !estaEditando && verNota(nota)}
//                   onDoubleClick={(e) => {
//                     e.stopPropagation();
//                     if (esMia && !estaEditando) {
//                       setNotaEditando(nota.id);
//                       setTextoEditando(nota.texto);
//                     }
//                   }}
//                 >
//                   {esMia && <span className="nota-indicator">●</span>}
                  
//                   {estaEditando ? (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%', paddingTop: 4 }}>
//                       <TextArea
//                         value={textoEditando}
//                         onChange={(e) => setTextoEditando(e.target.value)}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
//                             e.preventDefault();
//                             guardarEdicion(nota.id);
//                           }
//                           if (e.key === 'Escape') {
//                             setNotaEditando(null);
//                             setTextoEditando('');
//                           }
//                         }}
//                         autoFocus
//                         style={{
//                           flex: 1,
//                           borderRadius: 8,
//                           fontSize: '0.875rem',
//                           backgroundColor: nota.color,
//                           color: nota.colorTexto,
//                           fontFamily: nota.fuente,
//                           borderColor: 'rgba(108, 99, 255, 0.4)',
//                           minHeight: 60
//                         }}
//                         rows={3}
//                         maxLength={200}
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                       <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
//                         <Button size="small" type="primary" icon={<SaveOutlined />} onClick={() => guardarEdicion(nota.id)} disabled={!textoEditando.trim()}>
//                           Guardar
//                         </Button>
//                         <Button size="small" danger icon={<CloseOutlined />} onClick={() => { setNotaEditando(null); setTextoEditando(''); }}>
//                           Cancelar
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="nota-handle">{esMia ? '⠿' : '🔒'}</div>
//                       <p className="nota-texto">{nota.texto}</p>
                      
//                       {/* ===== REACCIONES EN LA NOTA ===== */}
//                       {renderReacciones(nota)}
                      
//                       <div className="nota-footer">
//                         <span className="nota-timestamp">
//                           {new Date(nota.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </span>
//                         {/* Botón para agregar reacción desde la nota */}
//                         <Popover
//                           content={
//                             <div style={{ display: 'flex', gap: 8 }}>
//                               {REACCIONES.map(({ emoji, key }) => (
//                                 <Button
//                                   key={key}
//                                   type="text"
//                                   size="small"
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleReaccion(nota.id, key);
//                                   }}
//                                   style={{ fontSize: 20 }}
//                                 >
//                                   {emoji}
//                                 </Button>
//                               ))}
//                             </div>
//                           }
//                           trigger="click"
//                           placement="top"
//                         >
//                           <Button 
//                             type="text" 
//                             size="small" 
//                             className="nota-reaccion-btn"
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             😊
//                           </Button>
//                         </Popover>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </main>

//       {/* ===== INFO TABLERO ===== */}
//       <div className="app-info">
//         <span>📌 {notas.length} chismes</span>
//         <span>🔍 {Math.round(zoom * 100)}%</span>
//         <span className="app-info-highlight">● {notas.filter(n => n.userId === userId).length} tuyos</span>
//       </div>

//       {/* ===== BOTÓN FLOTANTE ===== */}
//       <button 
//         className="app-fab-custom"
//         onClick={() => setModalPublicar(!modalPublicar)}
//         aria-label={modalPublicar ? 'Cerrar' : 'Nuevo chisme'}
//       >
//         {modalPublicar ? <CloseOutlined /> : <PlusOutlined />}
//       </button>

//       {/* ===== MODAL PUBLICAR ===== */}
//       <Modal
//         open={modalPublicar}
//         onCancel={() => setModalPublicar(false)}
//         footer={null}
//         closable={false}
//         centered
//         width={isMobile ? '95%' : 420}
//         destroyOnClose
//         styles={{ body: { padding: isMobile ? 16 : 24, maxHeight: isMobile ? '80vh' : 'auto', overflowY: 'auto' } }}
//       >
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Text strong style={{ fontSize: isMobile ? 16 : 18 }}>📝 Nuevo chisme</Text>
//             <Button type="text" icon={<CloseOutlined />} onClick={() => setModalPublicar(false)} size={isMobile ? 'small' : 'middle'} />
//           </div>

//           <TextArea
//             placeholder="¿Qué chisme tienes para contar?"
//             value={nuevoTexto}
//             onChange={(e) => setNuevoTexto(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
//                 e.preventDefault();
//                 publicarChisme();
//               }
//             }}
//             maxLength={200}
//             rows={isMobile ? 3 : 4}
//             style={{ borderRadius: 12 }}
//             autoFocus
//             showCount={{ formatter: ({ count, maxLength }) => `${count}/${maxLength}` }}
//           />

//           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8 }}>
//             <div className="modal-controls">
//               <BgColorsOutlined style={{ color: '#6b7280', fontSize: 14 }} />
//               <span className="modal-controls-label">Fondo</span>
//               <ColorPicker value={nuevoColor} onChange={(c) => setNuevoColor(c.toHexString())} size={isMobile ? 'small' : 'middle'} />
//             </div>
            
//             <div className="modal-controls">
//               <EditOutlined style={{ color: '#6b7280', fontSize: 14 }} />
//               <span className="modal-controls-label">Texto</span>
//               <ColorPicker value={nuevoColorTexto} onChange={(c) => setNuevoColorTexto(c.toHexString())} size={isMobile ? 'small' : 'middle'} />
//             </div>
            
//             <div className="modal-controls" style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
//               <FontSizeOutlined style={{ color: '#6b7280', fontSize: 14 }} />
//               <Select
//                 value={nuevaFuente}
//                 onChange={setNuevaFuente}
//                 options={fuentes}
//                 style={{ flex: 1 }}
//                 size={isMobile ? 'small' : 'middle'}
//                 bordered={false}
//               />
//             </div>
//           </div>

//           <Button
//             type="primary"
//             block
//             size={isMobile ? 'middle' : 'large'}
//             onClick={publicarChisme}
//             disabled={!nuevoTexto.trim()}
//             className="modal-publicar-btn"
//             icon={<SendOutlined />}
//           >
//             Publicar chisme
//           </Button>
          
//           <Text style={{ textAlign: 'center', fontSize: isMobile ? 10 : 12, color: '#9ca3af', opacity: 0.6 }}>
//             Ctrl + Enter para publicar rápido
//           </Text>
//         </div>
//       </Modal>

//       {/* ===== MODAL VER NOTA ===== */}
//       <Modal
//         open={modalNota}
//         onCancel={() => setModalNota(false)}
//         footer={null}
//         closable={false}
//         centered
//         width={isMobile ? '95%' : 500}
//         destroyOnClose
//         styles={{ body: { padding: 0 } }}
//       >
//         {notaSeleccionada && (
//           <div style={{ position: 'relative' }}>
//             {/* Botón cerrar */}
//             <button className="modal-close-btn" onClick={() => setModalNota(false)}>
//               <CloseOutlined style={{ color: '#4b5563' }} />
//             </button>

//             {/* Flechas de navegación */}
//             {notas.length > 1 && (
//               <>
//                 <button
//                   className="modal-nota-nav-btn"
//                   style={{ left: isMobile ? 8 : -50 }}
//                   onClick={verNotaAnterior}
//                 >
//                   <LeftOutlined style={{ fontSize: 20 }} />
//                 </button>
//                 <button
//                   className="modal-nota-nav-btn"
//                   style={{ right: isMobile ? 8 : -50 }}
//                   onClick={verNotaSiguiente}
//                 >
//                   <RightOutlined style={{ fontSize: 20 }} />
//                 </button>
//               </>
//             )}

//             {/* Contenido de la nota */}
//             <div 
//               className="modal-nota-content"
//               style={{
//                 backgroundColor: notaSeleccionada.color || '#FFD700',
//                 color: notaSeleccionada.colorTexto || '#000000',
//                 fontFamily: notaSeleccionada.fuente || 'Arial, sans-serif',
//                 padding: isMobile ? '48px 24px 24px' : '56px 32px 32px',
//                 minHeight: isMobile ? 200 : 250,
//               }}
//             >
//               {/* Contador */}
//               {notas.length > 1 && (
//                 <div className="modal-nota-counter">
//                   {indiceNotaActual + 1} / {notas.length}
//                 </div>
//               )}

//               {/* Tags */}
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, marginTop: notas.length > 1 ? 20 : 0 }}>
//                 {notaSeleccionada.userId === userId && (
//                   <Tag color="purple" style={{ borderRadius: 12, fontSize: 12 }}>● Tu chisme</Tag>
//                 )}
//                 {notaSeleccionada.censurada && (
//                   <Tag color="red" style={{ borderRadius: 12, fontSize: 12 }}>🔞 Censurada</Tag>
//                 )}
//                 {notaSeleccionada.editado && (
//                   <Tag color="blue" style={{ borderRadius: 12, fontSize: 12 }}>✏️ Editado</Tag>
//                 )}
//               </div>
              
//               {/* Texto */}
//               <Paragraph style={{ fontSize: isMobile ? 18 : 24, lineHeight: 1.6, marginBottom: 24, wordBreak: 'break-word' }}>
//                 {notaSeleccionada.texto}
//               </Paragraph>

//               {/* ===== REACCIONES EN EL MODAL ===== */}
//               <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
//                 {REACCIONES.map(({ emoji, key }) => {
//                   const count = notaSeleccionada.reacciones?.[key]?.length || 0;
//                   const estaActiva = notaSeleccionada.reacciones?.[key]?.includes(userId) || false;
//                   return (
//                     <Button
//                       key={key}
//                       type={estaActiva ? 'primary' : 'default'}
//                       size="small"
//                       onClick={() => handleReaccion(notaSeleccionada.id, key)}
//                       style={{ 
//                         borderRadius: 20,
//                         background: estaActiva ? 'rgba(108, 99, 255, 0.15)' : 'transparent',
//                         borderColor: estaActiva ? '#6c63ff' : '#d9d9d9'
//                       }}
//                     >
//                       {emoji} {count > 0 && count}
//                     </Button>
//                   );
//                 })}
//               </div>
              
//               {/* Footer */}
//               <div style={{ 
//                 display: 'flex', 
//                 flexDirection: isMobile ? 'column' : 'row', 
//                 justifyContent: 'space-between', 
//                 alignItems: isMobile ? 'flex-start' : 'center', 
//                 gap: 8, 
//                 paddingTop: 16, 
//                 borderTop: '1px solid rgba(255,255,255,0.2)' 
//               }}>
//                 <Text style={{ fontSize: 12, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
//                   <ClockCircleOutlined />
//                   {new Date(notaSeleccionada.timestamp).toLocaleString('es-ES', {
//                     day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
//                   })}
//                 </Text>
//                 <Text style={{ fontSize: 12, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
//                   <UserOutlined />
//                   {notaSeleccionada.userId === userId ? 'Tú' : 'Anónimo'}
//                 </Text>
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { App as AntApp, notification, Typography, Space, Button, Badge, Tooltip, Modal, Input, Select, ColorPicker, Tag, Grid, Popover, message } from 'antd';
import { 
  EyeOutlined, 
  AimOutlined, 
  PushpinOutlined,
  PlusOutlined, 
  CloseOutlined,
  BgColorsOutlined, 
  EditOutlined, 
  FontSizeOutlined, 
  SendOutlined,
  UserOutlined, 
  ClockCircleOutlined,
  LeftOutlined,
  RightOutlined,
  SaveOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import io from 'socket.io-client';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

const fuentes = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: "'Courier New', monospace", label: 'Courier New' },
  { value: "'Comic Sans MS', cursive", label: 'Comic Sans' },
  { value: 'Impact, sans-serif', label: 'Impact' },
  { value: "'Times New Roman', serif", label: 'Times New Roman' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
];

const REACCIONES = [
  { emoji: '😂', label: 'Risa', key: 'risa' },
  { emoji: '❤️', label: 'Corazón', key: 'corazon' },
  { emoji: '😡', label: 'Enojo', key: 'enojo' },
  { emoji: '🔗', label: 'Link', key: 'link' },
];

function App() {
  const { message: messageApi } = AntApp.useApp();
  const [api, contextHolder] = notification.useNotification();
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  
  const [socket, setSocket] = useState(null);
  const [notas, setNotas] = useState([]);
  const [userId, setUserId] = useState('');
  const [modalPublicar, setModalPublicar] = useState(false);
  const [modalNota, setModalNota] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const [indiceNotaActual, setIndiceNotaActual] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });
  const [arrastrando, setArrastrando] = useState(false);
  const [inicioArrastre, setInicioArrastre] = useState({ x: 0, y: 0 });
  const [notaEditando, setNotaEditando] = useState(null);
  const [textoEditando, setTextoEditando] = useState('');
  const [ultimaNotaId, setUltimaNotaId] = useState(null);
  
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [nuevoColor, setNuevoColor] = useState('#FFD700');
  const [nuevoColorTexto, setNuevoColorTexto] = useState('#000000');
  const [nuevaFuente, setNuevaFuente] = useState('Arial, sans-serif');
  
  const tableroRef = useRef(null);
  const wrapperRef = useRef(null);

  const TABLERO_ANCHO = 2000;
  const TABLERO_ALTO = 1500;
  const TAMANO_NOTA = 160;
  const MARGEN_TABLERO = 10;

  // Inicializar usuario
  useEffect(() => {
    let savedUserId = localStorage.getItem('chismografo_userId');
    if (!savedUserId) {
      savedUserId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chismografo_userId', savedUserId);
    }
    setUserId(savedUserId);
  }, []);

  // Conectar socket
  useEffect(() => {
    if (!userId) return;

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      messageApi.success('📢 Conectado al Chismógrafo');
    });

    newSocket.on('connect_error', () => {
      messageApi.error('❌ Error de conexión');
    });

    newSocket.on('disconnect', () => {
      messageApi.warning('🔌 Desconectado');
    });

    newSocket.on('notas-iniciales', (data) => {
      setNotas(data);
    });
    
    newSocket.on('nota-agregada', (nuevaNota) => {
      setNotas(prev => {
        const existe = prev.some(n => n.id === nuevaNota.id);
        if (existe) return prev;
        return [...prev, nuevaNota];
      });
      setUltimaNotaId(nuevaNota.id);
      setTimeout(() => setUltimaNotaId(null), 2500);
      
      if (nuevaNota.userId === userId) {
        messageApi.success('✅ ¡Chisme publicado!');
      } else {
        api.info({
          message: '💬 ¡Nuevo chisme!',
          description: 'Alguien ha publicado un nuevo chisme en el tablero',
          placement: 'topRight',
          duration: 5,
          style: {
            background: 'linear-gradient(135deg, #6c63ff, #8b7fff)',
            color: 'white',
            borderRadius: '12px',
          },
        });
      }
    });

    newSocket.on('nota-movida', ({ id, x, y }) => {
      setNotas(prev => prev.map(nota => 
        nota.id === id ? { ...nota, x, y } : nota
      ));
    });

    newSocket.on('nota-editada', ({ id, texto, color, fuente, colorTexto, censurada, editado }) => {
      setNotas(prev => prev.map(nota => 
        nota.id === id ? { ...nota, texto, color, fuente, colorTexto, censurada, editado } : nota
      ));
      messageApi.info('✏️ Nota actualizada');
    });

    newSocket.on('nota-reaccionada', ({ id, reacciones }) => {
      setNotas(prev => prev.map(nota => 
        nota.id === id ? { ...nota, reacciones } : nota
      ));
    });

    newSocket.on('error', ({ mensaje }) => {
      messageApi.error('❌ ' + mensaje);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, messageApi, api]);

  // Generar posición cercana al centro
  const generarPosicion = useCallback(() => {
    const centroX = TABLERO_ANCHO / 2;
    const centroY = TABLERO_ALTO / 2;
    const radio = 300;
    
    let intentos = 0;
    let nuevaX, nuevaY;
    
    do {
      const angulo = Math.random() * Math.PI * 2;
      const distancia = Math.random() * radio;
      nuevaX = centroX + Math.cos(angulo) * distancia - TAMANO_NOTA / 2;
      nuevaY = centroY + Math.sin(angulo) * distancia - TAMANO_NOTA / 2;
      
      nuevaX = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ANCHO - TAMANO_NOTA - MARGEN_TABLERO, nuevaX));
      nuevaY = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ALTO - TAMANO_NOTA - MARGEN_TABLERO, nuevaY));
      
      intentos++;
    } while (
      intentos < 100 && 
      notas.some(n => Math.abs(n.x - nuevaX) < TAMANO_NOTA - 20 && Math.abs(n.y - nuevaY) < TAMANO_NOTA - 20)
    );
    
    return { x: nuevaX, y: nuevaY };
  }, [notas]);

  // Publicar chisme
  const publicarChisme = useCallback(() => {
    if (!socket?.connected) {
      messageApi.error('❌ No hay conexión con el servidor');
      return;
    }
    const texto = nuevoTexto.trim();
    if (!texto) {
      messageApi.warning('✏️ Escribe algo primero');
      return;
    }
    const pos = generarPosicion();
    socket.emit('nueva-nota', {
      texto,
      color: nuevoColor,
      fuente: nuevaFuente,
      colorTexto: nuevoColorTexto,
      userId,
      x: pos.x,
      y: pos.y
    });
    setNuevoTexto('');
    setNuevoColor('#FFD700');
    setNuevoColorTexto('#000000');
    setNuevaFuente('Arial, sans-serif');
    setModalPublicar(false);
  }, [socket, nuevoTexto, nuevoColor, nuevaFuente, nuevoColorTexto, userId, generarPosicion, messageApi]);

  // Reacción
  const handleReaccion = useCallback((notaId, reaccionKey) => {
    if (!socket?.connected) {
      messageApi.error('❌ No hay conexión');
      return;
    }
    socket.emit('reaccionar-nota', { 
      id: notaId, 
      reaccion: reaccionKey,
      userId 
    });
  }, [socket, userId, messageApi]);

  // Navegación
  const irAChismeAleatorio = useCallback(() => {
    if (notas.length === 0) {
      messageApi.info('📢 No hay chismes aún');
      return;
    }
    const indiceAleatorio = Math.floor(Math.random() * notas.length);
    setIndiceNotaActual(indiceAleatorio);
    setNotaSeleccionada(notas[indiceAleatorio]);
    setModalNota(true);
  }, [notas, messageApi]);

  const verNotaAnterior = useCallback(() => {
    if (notas.length === 0) return;
    const nuevoIndice = indiceNotaActual > 0 ? indiceNotaActual - 1 : notas.length - 1;
    setIndiceNotaActual(nuevoIndice);
    setNotaSeleccionada(notas[nuevoIndice]);
  }, [notas, indiceNotaActual]);

  const verNotaSiguiente = useCallback(() => {
    if (notas.length === 0) return;
    const nuevoIndice = indiceNotaActual < notas.length - 1 ? indiceNotaActual + 1 : 0;
    setIndiceNotaActual(nuevoIndice);
    setNotaSeleccionada(notas[nuevoIndice]);
  }, [notas, indiceNotaActual]);

  const centrarTablero = useCallback(() => {
    setPosicion({ x: 0, y: 0 });
    setZoom(1);
    messageApi.success('🎯 Tablero centrado');
  }, [messageApi]);

  // ===== EDICIÓN DE NOTA =====
  const iniciarEdicion = useCallback((nota) => {
    if (nota.userId !== userId) {
      messageApi.warning('🔒 Solo puedes editar tus propios chismes');
      return;
    }
    setNotaEditando(nota.id);
    setTextoEditando(nota.texto);
  }, [userId, messageApi]);

  const guardarEdicion = useCallback((id) => {
    const nota = notas.find(n => n.id === id);
    if (!nota) return;
    
    const texto = textoEditando.trim();
    if (!texto) {
      messageApi.warning('✏️ Escribe algo');
      return;
    }
    
    socket?.emit('editar-nota', {
      id,
      texto: texto,
      color: nota.color,
      fuente: nota.fuente,
      colorTexto: nota.colorTexto,
      userId
    });
    
    setNotaEditando(null);
    setTextoEditando('');
    messageApi.success('✅ Nota actualizada');
  }, [notas, textoEditando, socket, userId, messageApi]);

  const cancelarEdicion = useCallback(() => {
    setNotaEditando(null);
    setTextoEditando('');
  }, []);

  const handleEditKeyDown = useCallback((e, id) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      guardarEdicion(id);
    }
    if (e.key === 'Escape') {
      cancelarEdicion();
    }
  }, [guardarEdicion, cancelarEdicion]);

  // Arrastre del tablero
  const iniciarArrastre = useCallback((e) => {
    if (e.target.closest('.nota-item')) return;
    if (e.button !== undefined && e.button !== 0) return;
    
    const touch = e.touches?.[0] || e;
    setArrastrando(true);
    setInicioArrastre({
      x: touch.clientX - posicion.x,
      y: touch.clientY - posicion.y
    });
  }, [posicion]);

  const moverArrastre = useCallback((e) => {
    if (!arrastrando) return;
    e.preventDefault();
    
    const touch = e.touches?.[0] || e;
    let nuevaX = touch.clientX - inicioArrastre.x;
    let nuevaY = touch.clientY - inicioArrastre.y;
    
    const wrapper = wrapperRef.current;
    if (wrapper) {
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      const maxX = Math.max(0, TABLERO_ANCHO * zoom - w);
      const maxY = Math.max(0, TABLERO_ALTO * zoom - h);
      nuevaX = Math.max(-maxX, Math.min(0, nuevaX));
      nuevaY = Math.max(-maxY, Math.min(0, nuevaY));
    }
    
    setPosicion({ x: nuevaX, y: nuevaY });
  }, [arrastrando, inicioArrastre, zoom]);

  const terminarArrastre = useCallback(() => {
    setArrastrando(false);
  }, []);

  // Arrastre de nota
  const iniciarArrastreNota = useCallback((e, nota) => {
    if (nota.userId !== userId) {
      messageApi.warning('🔒 Solo puedes mover tus propios chismes');
      return;
    }
    
    e.stopPropagation();
    e.preventDefault();
    
    const touch = e.touches?.[0] || e;
    const tablero = tableroRef.current;
    if (!tablero) return;
    
    const rect = tablero.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left - (nota.x * zoom);
    const offsetY = touch.clientY - rect.top - (nota.y * zoom);

    const onMove = (ev) => {
      ev.preventDefault();
      const t = ev.touches?.[0] || ev;
      let nx = (t.clientX - rect.left - offsetX) / zoom;
      let ny = (t.clientY - rect.top - offsetY) / zoom;
      
      nx = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ANCHO - TAMANO_NOTA - MARGEN_TABLERO, nx));
      ny = Math.max(MARGEN_TABLERO, Math.min(TABLERO_ALTO - TAMANO_NOTA - MARGEN_TABLERO, ny));
      
      const colision = notas.some(n => 
        n.id !== nota.id && 
        Math.abs(n.x - nx) < TAMANO_NOTA - 30 && 
        Math.abs(n.y - ny) < TAMANO_NOTA - 30
      );
      
      if (!colision) {
        socket?.emit('mover-nota', { id: nota.id, x: nx, y: ny, userId });
      }
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }, [userId, zoom, socket, notas, messageApi]);

  const verNota = useCallback((nota) => {
    const indice = notas.findIndex(n => n.id === nota.id);
    setIndiceNotaActual(indice >= 0 ? indice : 0);
    setNotaSeleccionada(nota);
    setModalNota(true);
  }, [notas]);

  // Zoom
  useEffect(() => {
    const manejarZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.92 : 1.08;
        setZoom(prev => {
          const newZoom = prev * delta;
          return Math.min(Math.max(newZoom, 0.3), 2);
        });
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('wheel', manejarZoom, { passive: false });
    }
    
    return () => {
      if (wrapper) {
        wrapper.removeEventListener('wheel', manejarZoom);
      }
    };
  }, []);

  // Renderizar reacciones
  const renderReacciones = (nota) => {
    if (!nota.reacciones || Object.keys(nota.reacciones).length === 0) return null;
    
    return (
      <div className="nota-reacciones">
        {REACCIONES.map(({ emoji, key }) => {
          const count = nota.reacciones[key]?.length || 0;
          if (count === 0) return null;
          const estaActiva = nota.reacciones[key]?.includes(userId) || false;
          return (
            <span 
              key={key}
              className={`nota-reaccion ${estaActiva ? 'activa' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleReaccion(nota.id, key);
              }}
            >
              {emoji} {count}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="app-layout">
      {contextHolder}

      {/* ===== NAVBAR ===== */}
      <nav className="app-navbar">
        <div className="app-navbar-inner">
          <div className="app-brand">
            <Text strong className="app-title">📢 Chismógrafo</Text>
            <span className="app-subtitle">Proyelco</span>
          </div>
          
          <Space size="small">
            <Tooltip title="Leer chisme aleatorio">
              <Button type="text" icon={<EyeOutlined />} onClick={irAChismeAleatorio} size="small">
                {!isMobile && <span style={{ marginLeft: 4 }}>Leer chisme</span>}
              </Button>
            </Tooltip>
            
            <Tooltip title="Centrar tablero">
              <Button type="text" icon={<AimOutlined />} onClick={centrarTablero} size="small" />
            </Tooltip>
            
            <Tooltip title={`${notas.length} chismes`}>
              <Badge count={notas.length} showZero size="small">
                <Button type="text" icon={<PushpinOutlined />} size="small" />
              </Badge>
            </Tooltip>
          </Space>
        </div>
      </nav>

      {/* ===== TABLERO ===== */}
      <main 
        className="app-tablero"
        ref={wrapperRef}
        onMouseDown={iniciarArrastre}
        onMouseMove={moverArrastre}
        onMouseUp={terminarArrastre}
        onMouseLeave={terminarArrastre}
        onTouchStart={iniciarArrastre}
        onTouchMove={moverArrastre}
        onTouchEnd={terminarArrastre}
      >
        <div 
          ref={tableroRef}
          className="tablero-canvas"
          style={{
            transform: `translate(${posicion.x}px, ${posicion.y}px) scale(${zoom})`,
            width: TABLERO_ANCHO,
            height: TABLERO_ALTO,
            transition: arrastrando ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <div className="tablero-grid" />
          
          <div className="tablero-border left" />
          <div className="tablero-border right" />
          <div className="tablero-border top" />
          <div className="tablero-border bottom" />
          <div className="tablero-corner tl" />
          <div className="tablero-corner tr" />
          <div className="tablero-corner bl" />
          <div className="tablero-corner br" />

          {notas.length === 0 ? (
            <div className="tablero-empty">
              <div className="tablero-empty-icon">📢</div>
              <Text type="secondary" style={{ fontSize: '1rem' }}>No hay chismes aún</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '0.85rem' }}>¡Sé el primero en publicar!</Text>
            </div>
          ) : (
            notas.map((nota) => {
              const esMia = nota.userId === userId;
              const esNueva = ultimaNotaId === nota.id;
              const estaEditando = notaEditando === nota.id;

              return (
                <div
                  key={nota.id}
                  className={`nota-item ${esMia ? 'nota-mia' : ''} ${esNueva ? 'nota-nueva' : ''}`}
                  style={{
                    left: nota.x || 50,
                    top: nota.y || 50,
                    backgroundColor: nota.color || '#FFD700',
                    fontFamily: nota.fuente || 'Arial, sans-serif',
                    color: nota.colorTexto || '#000000',
                    cursor: esMia ? 'grab' : 'pointer'
                  }}
                  onMouseDown={(e) => esMia && iniciarArrastreNota(e, nota)}
                  onTouchStart={(e) => esMia && iniciarArrastreNota(e, nota)}
                  onClick={() => !estaEditando && verNota(nota)}
                  onDoubleClick={() => {
                    if (esMia && !estaEditando) {
                      iniciarEdicion(nota);
                    }
                  }}
                >
                  {esMia && <span className="nota-indicator">●</span>}
                  
                  {estaEditando ? (
                    <div className="nota-editar-container">
                      <TextArea
                        value={textoEditando}
                        onChange={(e) => setTextoEditando(e.target.value)}
                        onKeyDown={(e) => handleEditKeyDown(e, nota.id)}
                        autoFocus
                        className="nota-editar-textarea"
                        style={{
                          backgroundColor: nota.color,
                          color: nota.colorTexto,
                          fontFamily: nota.fuente,
                          borderColor: 'rgba(108, 99, 255, 0.4)',
                          minHeight: 60,
                          borderRadius: 8,
                          fontSize: '0.875rem',
                          padding: 8,
                          resize: 'none',
                          width: '100%'
                        }}
                        rows={3}
                        maxLength={200}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="nota-editar-actions">
                        <Button 
                          size="small" 
                          type="primary" 
                          icon={<SaveOutlined />} 
                          onClick={() => guardarEdicion(nota.id)} 
                          disabled={!textoEditando.trim()}
                        >
                          Guardar
                        </Button>
                        <Button 
                          size="small" 
                          danger 
                          icon={<CloseOutlined />} 
                          onClick={cancelarEdicion}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="nota-handle">{esMia ? '⠿' : '🔒'}</div>
                      <p className="nota-texto">{nota.texto}</p>
                      
                      {renderReacciones(nota)}
                      
                      <div className="nota-footer">
                        <span className="nota-timestamp">
                          {new Date(nota.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="nota-actions">
                          {esMia && (
                            <Button 
                              type="text" 
                              size="small" 
                              icon={<EditOutlined />} 
                              className="nota-action-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                iniciarEdicion(nota);
                              }}
                            />
                          )}
                          <Popover
                            content={
                              <div style={{ display: 'flex', gap: 8 }}>
                                {REACCIONES.map(({ emoji, key }) => (
                                  <Button
                                    key={key}
                                    type="text"
                                    size="small"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleReaccion(nota.id, key);
                                    }}
                                    style={{ fontSize: 20 }}
                                  >
                                    {emoji}
                                  </Button>
                                ))}
                              </div>
                            }
                            trigger="click"
                            placement="top"
                          >
                            <Button 
                              type="text" 
                              size="small" 
                              className="nota-reaccion-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              😊
                            </Button>
                          </Popover>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* ===== INFO TABLERO ===== */}
      <div className="app-info">
        <span>📌 {notas.length} chismes</span>
        <span>🔍 {Math.round(zoom * 100)}%</span>
        <span className="app-info-highlight">● {notas.filter(n => n.userId === userId).length} tuyos</span>
      </div>

      {/* ===== BOTÓN FLOTANTE ===== */}
      <button 
        className="app-fab-custom"
        onClick={() => setModalPublicar(!modalPublicar)}
        aria-label={modalPublicar ? 'Cerrar' : 'Nuevo chisme'}
      >
        {modalPublicar ? <CloseOutlined /> : <PlusOutlined />}
      </button>

      {/* ===== MODAL PUBLICAR ===== */}
      <Modal
        open={modalPublicar}
        onCancel={() => setModalPublicar(false)}
        footer={null}
        closable={false}
        centered
        width={isMobile ? '95%' : 420}
        destroyOnClose
        styles={{ body: { padding: isMobile ? 16 : 24, maxHeight: isMobile ? '80vh' : 'auto', overflowY: 'auto' } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text strong style={{ fontSize: isMobile ? 16 : 18 }}>📝 Nuevo chisme</Text>
            <Button type="text" icon={<CloseOutlined />} onClick={() => setModalPublicar(false)} size={isMobile ? 'small' : 'middle'} />
          </div>

          <TextArea
            placeholder="¿Qué chisme tienes para contar?"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                publicarChisme();
              }
            }}
            maxLength={200}
            rows={isMobile ? 3 : 4}
            style={{ borderRadius: 12 }}
            autoFocus
            showCount={{ formatter: ({ count, maxLength }) => `${count}/${maxLength}` }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8 }}>
            <div className="modal-controls">
              <BgColorsOutlined style={{ color: '#6b7280', fontSize: 14 }} />
              <span className="modal-controls-label">Fondo</span>
              <ColorPicker value={nuevoColor} onChange={(c) => setNuevoColor(c.toHexString())} size={isMobile ? 'small' : 'middle'} />
            </div>
            
            <div className="modal-controls">
              <EditOutlined style={{ color: '#6b7280', fontSize: 14 }} />
              <span className="modal-controls-label">Texto</span>
              <ColorPicker value={nuevoColorTexto} onChange={(c) => setNuevoColorTexto(c.toHexString())} size={isMobile ? 'small' : 'middle'} />
            </div>
            
            <div className="modal-controls" style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
              <FontSizeOutlined style={{ color: '#6b7280', fontSize: 14 }} />
              <Select
                value={nuevaFuente}
                onChange={setNuevaFuente}
                options={fuentes}
                style={{ flex: 1 }}
                size={isMobile ? 'small' : 'middle'}
                bordered={false}
              />
            </div>
          </div>

          <Button
            type="primary"
            block
            size={isMobile ? 'middle' : 'large'}
            onClick={publicarChisme}
            disabled={!nuevoTexto.trim()}
            className="modal-publicar-btn"
            icon={<SendOutlined />}
          >
            Publicar chisme
          </Button>
          
          <Text style={{ textAlign: 'center', fontSize: isMobile ? 10 : 12, color: '#9ca3af', opacity: 0.6 }}>
            Ctrl + Enter para publicar rápido
          </Text>
        </div>
      </Modal>

      {/* ===== MODAL VER NOTA ===== */}
      <Modal
        open={modalNota}
        onCancel={() => setModalNota(false)}
        footer={null}
        closable={false}
        centered
        width={isMobile ? '95%' : 500}
        destroyOnClose
        styles={{ body: { padding: 0 } }}
      >
        {notaSeleccionada && (
          <div style={{ position: 'relative' }}>
            <button className="modal-close-btn" onClick={() => setModalNota(false)}>
              <CloseOutlined style={{ color: '#4b5563' }} />
            </button>

            {notas.length > 1 && (
              <>
                <button
                  className="modal-nota-nav-btn"
                  style={{ left: isMobile ? 8 : -50 }}
                  onClick={verNotaAnterior}
                >
                  <LeftOutlined style={{ fontSize: 20 }} />
                </button>
                <button
                  className="modal-nota-nav-btn"
                  style={{ right: isMobile ? 8 : -50 }}
                  onClick={verNotaSiguiente}
                >
                  <RightOutlined style={{ fontSize: 20 }} />
                </button>
              </>
            )}

            <div 
              className="modal-nota-content"
              style={{
                backgroundColor: notaSeleccionada.color || '#FFD700',
                color: notaSeleccionada.colorTexto || '#000000',
                fontFamily: notaSeleccionada.fuente || 'Arial, sans-serif',
                padding: isMobile ? '48px 24px 24px' : '56px 32px 32px',
                minHeight: isMobile ? 200 : 250,
              }}
            >
              {notas.length > 1 && (
                <div className="modal-nota-counter">
                  {indiceNotaActual + 1} / {notas.length}
                </div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, marginTop: notas.length > 1 ? 20 : 0 }}>
                {notaSeleccionada.userId === userId && (
                  <Tag color="purple" style={{ borderRadius: 12, fontSize: 12 }}>● Tu chisme</Tag>
                )}
                {notaSeleccionada.censurada && (
                  <Tag color="red" style={{ borderRadius: 12, fontSize: 12 }}>🔞 Censurada</Tag>
                )}
                {notaSeleccionada.editado && (
                  <Tag color="blue" style={{ borderRadius: 12, fontSize: 12 }}>✏️ Editado</Tag>
                )}
              </div>
              
              <Paragraph style={{ fontSize: isMobile ? 18 : 24, lineHeight: 1.6, marginBottom: 24, wordBreak: 'break-word' }}>
                {notaSeleccionada.texto}
              </Paragraph>

              {/* Reacciones en modal */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                {REACCIONES.map(({ emoji, key }) => {
                  const count = notaSeleccionada.reacciones?.[key]?.length || 0;
                  const estaActiva = notaSeleccionada.reacciones?.[key]?.includes(userId) || false;
                  return (
                    <Button
                      key={key}
                      type={estaActiva ? 'primary' : 'default'}
                      size="small"
                      onClick={() => handleReaccion(notaSeleccionada.id, key)}
                      style={{ 
                        borderRadius: 20,
                        background: estaActiva ? 'rgba(108, 99, 255, 0.15)' : 'transparent',
                        borderColor: estaActiva ? '#6c63ff' : '#d9d9d9'
                      }}
                    >
                      {emoji} {count > 0 && count}
                    </Button>
                  );
                })}
              </div>
              
              {/* Editar en modal */}
              {notaSeleccionada.userId === userId && (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setModalNota(false);
                    iniciarEdicion(notaSeleccionada);
                  }}
                  style={{ marginBottom: 12 }}
                >
                  ✏️ Editar
                </Button>
              )}
              
              <div style={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center', 
                gap: 8, 
                paddingTop: 16, 
                borderTop: '1px solid rgba(255,255,255,0.2)' 
              }}>
                <Text style={{ fontSize: 12, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ClockCircleOutlined />
                  {new Date(notaSeleccionada.timestamp).toLocaleString('es-ES', {
                    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </Text>
                <Text style={{ fontSize: 12, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <UserOutlined />
                  {notaSeleccionada.userId === userId ? 'Tú' : 'Anónimo'}
                </Text>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;