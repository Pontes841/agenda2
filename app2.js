const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const express = require('express');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
const http = require('http');
const fileUpload = require('express-fileupload');
const port = 8001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const mysql = require('mysql2/promise');
const nodeCron = require("node-cron");

// Função para criar conexão com o banco de dados
const createConnection = async () => {
    return await mysql.createConnection({
        host: '212.1.208.101',
        user: 'u896627913_teste',
        password: 'Fe91118825',
        database: 'u896627913_teste'
    });
}

// Função para atualizar o statusvd no banco de dados
const updateStatusvd = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET statusvd = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusvd:', error);
        return false;
    }
};
// Função para atualizar o statusdf no banco de dados
const updateStatusdf = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET statusdf = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusdf:', error);
        return false;
    }
};
// Função para atualizar o status1m no banco de dados
const updateStatus1m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status1m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status1m:', error);
        return false;
    }
};
// Função para atualizar o status3m no banco de dados
const updateStatus3m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status3m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status3m:', error);
        return false;
    }
};
// Função para atualizar o status6m no banco de dados
const updateStatus6m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status6m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status6m:', error);
        return false;
    }
};
// Função para atualizar o status12m no banco de dados
const updateStatus12m = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET status12m = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o status12m:', error);
        return false;
    }
};
// Função para atualizar o statusan no banco de dados
const updateStatusan = async (id) => {
    try {
        const connection = await createConnection();
        const query = 'UPDATE controle_os SET statusan = "enviado" WHERE id = ?';
        const [result] = await connection.execute(query, [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Erro ao atualizar o statusan:', error);
        return false;
    }
};

// Função para obter os registros de agendamento do banco de dados
const agendamentoZDG = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusvd IS NULL OR statusvd = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados
const agendamentoZDG2 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusdf IS NULL OR statusdf = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status1m
const agendamentoZDG3 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status1m IS NULL OR status1m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status3m
const agendamentoZDG4 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status3m IS NULL OR status3m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status6m
const agendamentoZDG5 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status6m IS NULL OR status6m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados status12m
const agendamentoZDG6 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE status12m IS NULL OR status12m = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};
// Função para obter os registros de agendamento do banco de dados statusan
const agendamentoZDG7 = async () => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * FROM controle_os WHERE statusan IS NULL OR statusan = ""');
        return rows;
    } catch (error) {
        console.error('Erro ao obter os registros de agendamento:', error);
        return [];
    }
};

// Configuração do servidor Express e Socket.IO
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(fileUpload({
    debug: true
}));

// Rota principal do aplicativo
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: __dirname
    });
});

// Criação do cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'bot-zdg' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't work in Windows
            '--disable-gpu'
        ]
    }
});

// Inicialização do cliente do WhatsApp
client.initialize();

// Configuração do Socket.IO para comunicação em tempo real
io.on('connection', function (socket) {
    socket.emit('message', 'Conectando...');

    // Evento para receber o QR Code e exibi-lo na interface
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'BOT-ZDG QRCode recebido, aponte a câmera do seu celular!');
        });
    });

    // Evento disparado quando o cliente está pronto para uso
    client.on('ready', async () => {
        socket.emit('ready', 'BOT-ZDG Dispositivo pronto!');
        socket.emit('message', 'BOT-ZDG Dispositivo pronto!');


        // Tarefa agendada para executar a lógica de envio de mensagens periodicamente
        nodeCron.schedule('*/60 * * * * *', async function () {
            try {
                const agendamentosSolicitacao = await agendamentoZDG();
                const agendamentosFinalizacao = await agendamentoZDG2();
                const agendamentosdate1m = await agendamentoZDG3();
                const agendamentosdate3m = await agendamentoZDG4();
                const agendamentosdate6m = await agendamentoZDG5();
                const agendamentosdate12m = await agendamentoZDG6();
                const agendamentosdata_aniversario = await agendamentoZDG7();

                const hoje = new Date();

                for (const agendamento of agendamentosSolicitacao) {
                    if (agendamento.data_solicitacao && agendamento.data_solicitacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemvd && agendamento.mensagemvd !== '') {
                            console.log('URL da mensagemvd:', agendamento.mensagemvd);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemvd);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '©oticasdinizpenedo' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemvd:', error);
                            }
                        }
                        const success = await updateStatusvd(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusvd atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusvd da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosFinalizacao) {
                    if (agendamento.data_finalizacao && agendamento.data_finalizacao <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        agendamento.enviado = true;
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagemdf && agendamento.mensagemdf !== '') {
                            console.log('URL da mensagemdf:', agendamento.mensagemdf);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagemdf);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '©oticasdinizpenedo' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagemdf:', error);
                            }
                        }
                        const success = await updateStatusdf(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusdf atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusdf da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate1m) {
                    if (agendamento.date1m && agendamento.date1m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem1m && agendamento.mensagem1m !== '') {
                            console.log('URL da mensagem1m:', agendamento.mensagem1m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem1m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '©oticasdinizpenedo' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem1m:', error);
                            }
                        }
                        const success = await updateStatus1m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status1m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status1m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate3m) {
                    if (agendamento.date3m && agendamento.date3m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem3m && agendamento.mensagem3m !== '') {
                            console.log('URL da mensagem3m:', agendamento.mensagem3m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem3m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '©oticasdinizpenedo' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem3m:', error);
                            }
                        }
                        const success = await updateStatus3m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status3m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status3m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate6m) {
                    if (agendamento.date6m && agendamento.date6m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem6m && agendamento.mensagem6m !== '') {
                            console.log('URL da mensagem6m:', agendamento.mensagem6m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem6m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '©oticasdinizpenedo' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem6m:', error);
                            }
                        }
                        const success = await updateStatus6m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status6m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status6m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdate12m) {
                    if (agendamento.date12m && agendamento.date12m <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensagem12m && agendamento.mensagem12m !== '') {
                            console.log('URL da mensagem12m:', agendamento.mensagem12m);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensagem12m);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '©oticasdinizpenedo' });
                            } catch (error) {
                                console.error('Erro ao obter a mensagem12m:', error);
                            }
                        }
                        const success = await updateStatus12m(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - status12m atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o status12m da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
                for (const agendamento of agendamentosdata_aniversario) {
                    if (agendamento.data_aniversario && agendamento.data_aniversario <= hoje && !agendamento.enviado) {
                        // Marcar o agendamento como enviado
                        if (agendamento.nome !== '') {
                            client.sendMessage(agendamento.fone + '@c.us', agendamento.nome);
                        }
                        if (agendamento.mensageman && agendamento.mensageman !== '') {
                            console.log('URL da mensageman:', agendamento.mensageman);
                            try {
                                const media = await MessageMedia.fromUrl(agendamento.mensageman);
                                client.sendMessage(agendamento.fone + '@c.us', media, { caption: '©oticasdinizpenedo' });
                            } catch (error) {
                                console.error('Erro ao obter a mensageman:', error);
                            }
                        }
                        const success = await updateStatusan(agendamento.id);
                        if (success) {
                            console.log('BOT-ZDG - Mensagem ID: ' + agendamento.id + ' - statusan atualizado para "enviado"');
                        } else {
                            console.log('BOT-ZDG - Falha ao atualizar o statusan da mensagem ID: ' + agendamento.id);
                        }
                    }
                }
            } catch (error) {
                console.error('Erro na tarefa agendada:', error);
            }
        });

    });

    const fs = require('fs');

    // Função para verificar se o cliente já está autenticado
    function checkAuthentication() {
        return new Promise((resolve, reject) => {
            fs.readFile('auth_indicator.txt', 'utf8', (err, data) => {
                if (err) {
                    // O arquivo de indicador de autenticação não existe ou não pode ser lido
                    resolve(false);
                } else {
                    // O arquivo de indicador de autenticação existe
                    resolve(true);
                }
            });
        });
    }

    // Função para verificar se o cliente já está autenticado
    function checkAuthentication() {
        return new Promise((resolve, reject) => {
            fs.readFile('auth_indicator.txt', 'utf8', (err, data) => {
                if (err) {
                    // O arquivo de indicador de autenticação não existe ou não pode ser lido
                    resolve(false);
                } else {
                    // O arquivo de indicador de autenticação existe
                    resolve(true);
                }
            });
        });
    }

    // Evento disparado quando o cliente é autenticado com sucesso
    client.on('authenticated', async () => {
        const authenticated = await checkAuthentication();

        if (!authenticated) {
            // Cliente autenticado pela primeira vez, salvar o indicador de autenticação
            fs.writeFile('auth_indicator.txt', 'authenticated', err => {
                if (err) {
                    console.error('Erro ao salvar o indicador de autenticação:', err);
                } else {
                    console.log('Indicador de autenticação salvo com sucesso');
                }
            });

            isClientAuthenticated = true;

            socket.emit('authenticated', 'BOT-ZDG Autenticado!');
            socket.emit('message', 'BOT-ZDG Autenticado!');
            console.log('BOT-ZDG Autenticado');
        } else {
            isClientAuthenticated = true;
            console.log('O cliente já está autenticado');
        }
    });

    // Evento disparado quando a autenticação falha
    client.on('auth_failure', function () {
        socket.emit('message', 'BOT-ZDG Falha na autenticação, reiniciando...');
        console.error('BOT-ZDG Falha na autenticação');
    });

    // Evento disparado quando o estado de conexão do cliente muda
    client.on('change_state', state => {
        console.log('BOT-ZDG Status de conexão:', state);
    });

    // Evento disparado quando o cliente é desconectado
    client.on('disconnected', (reason) => {
        socket.emit('message', 'BOT-ZDG Cliente desconectado!');
        console.log('BOT-ZDG Cliente desconectado', reason);
        client.initialize();
        isClientAuthenticated = false;
    });

    // Configuração do socket.io
    io.on('connection', function (socket) {
        console.log('Nova conexão:', socket.id);

        // Evento disparado quando o cliente é autenticado com sucesso
        socket.on('authenticate', async () => {
            if (isClientAuthenticated) {
                console.log('O cliente já está autenticado');
                socket.emit('authenticated', 'BOT-ZDG Autenticado!');
                socket.emit('message', 'BOT-ZDG Autenticado!');
            } else {
                console.log('Autenticando o cliente...');
                client.initialize();
            }
        });

        // Resto do código do socket.io...
    });

    // Inicialização do servidor
    server.listen(port, function () {
        console.log('BOT-ZDG rodando na porta *:' + port);
    });
