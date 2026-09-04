/**
 * Exemplo de backend para enviar notificação push.
 *
 * Como usar:
 * 1. No app, ative o Push e copie a subscription do console do navegador
 *    (ou de data.pushSubscription / localStorage).
 * 2. Cole a subscription abaixo no lugar de SUBSCRIPTION.
 * 3. Rode: node enviar-push-exemplo.js
 *
 * Dependência: npm install web-push
 */

const webpush = require('web-push');

// === CHAVES VAPID (as mesmas usadas no app) ===
// A chave PRIVADA nunca deve ir para o frontend!
const VAPID_PUBLIC  = 'BIkbLChIxtWybEaFybpRLRN37W4OOPJHGc50MgwGf_FGMgMDiGQFdJJgmIlv6ARo68KNkkt0ZPNd4yqcSLC18vw';
const VAPID_PRIVATE = 'mLWrv5jivSDTdgBOaEirqL5GDSNHwb7pFObzomt0jD4';

webpush.setVapidDetails(
  'mailto:seu-email@exemplo.com', // contato do dono do app
  VAPID_PUBLIC,
  VAPID_PRIVATE
);

// Cole aqui a subscription que o app salvou (objeto JSON completo)
const SUBSCRIPTION = {
  // endpoint: "https://fcm.googleapis.com/fcm/send/....",
  // keys: { p256dh: "...", auth: "..." }
};

const payload = JSON.stringify({
  title: 'Mulher Calendário Menstrual',
  body: 'Lembrete: você está na janela fértil. Aproveite o dia 💛',
  tag: 'janela-fertil',
  data: { url: './mulher-calendario-menstrual.html' }
});

async function enviar() {
  if (!SUBSCRIPTION.endpoint) {
    console.log('⚠️  Cole a subscription do app em SUBSCRIPTION antes de rodar.');
    console.log('   No console do navegador, depois de ativar o push, aparece o objeto.');
    process.exit(1);
  }

  try {
    const result = await webpush.sendNotification(SUBSCRIPTION, payload);
    console.log('✅ Notificação enviada!', result.statusCode);
  } catch (err) {
    console.error('❌ Erro ao enviar:', err.statusCode, err.body || err.message);
  }
}

enviar();
