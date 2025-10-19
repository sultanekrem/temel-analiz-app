// .env dosyasındaki API anahtarımızı güvenli bir şekilde içeri aktarıyoruz.
import { VITE_FMP_API_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  // Sayfa URL'sinden 'hisse' arama parametresini alıyoruz.
  // Örn: http://localhost:5173/?hisse=THYAO -> hisseKodu = "THYAO"
  const hisseKodu = url.searchParams.get('hisse');

  // Eğer bir hisse kodu aranmamışsa, boş bir obje döndür ve işlemi bitir.
  if (!hisseKodu) {
    return {
      sirketProfili: null
    };
  }

  console.log(`Sunucu tarafında ${hisseKodu} için veri çekiliyor...`);

  // API'ye istek atacağımız URL'yi hazırlıyoruz.
  const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${hisseKodu}?apikey=${VITE_FMP_API_KEY}`;

  try {
    const response = await fetch(apiUrl);

    // API'den gelen cevap başarılı değilse (örn: 404 Not Found)
    if (!response.ok) {
        
        console.error("API'den hatalı cevap alındı. Durum:", response.status, response.statusText);
        const errorBody = await response.text(); // API'nin döndüğü hata mesajını okumaya çalışalım
        console.error("API Cevabı:", errorBody);

      return { sirketProfili: null, error: "Veri alınamadı." };
    }

    const data = await response.json();
    
    // API bazen boş bir dizi dönebilir, bu durumu kontrol ediyoruz.
    if (data.length === 0) {
      return { sirketProfili: null, error: `${hisseKodu} koduna ait şirket bulunamadı.` };
    }

    // Başarılı bir şekilde veri çekersek, veriyi sayfa bileşenine gönderiyoruz.
    return {
      sirketProfili: data[0] // API'den gelen cevap bir dizi içinde tek bir obje olduğu için ilk elemanı alıyoruz.
    };

  } catch (error) {
    console.error("API isteği sırasında bir hata oluştu:", error);
    return { sirketProfili: null, error: "Bir hata oluştu." };
  }
}