const sharp = require('sharp');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    // Converte o Base64 de volta para binário
    const buffer = Buffer.from(imageBase64, 'base64');

    // Redimensiona e converte para GIF usando sharp
    const processedBuffer = await sharp(buffer)
      .resize(200, 200, { fit: 'cover' })
      .gif()
      .toBuffer();

    // Devolve o GIF como Base64 para o frontend exibir
    res.status(200).json({ gifBase64: processedBuffer.toString('base64') });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno ao processar a imagem' });
  }
}
