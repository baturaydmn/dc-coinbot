<h1>Merhabalar!</h1>
<p>Geçen gün başladığım "Yararlı şeyler paylaşma" serime bugün devam ediyorum, dünkü static portfolyonun ardından bugün discord sunucularınıza özel kullanabileceğiniz bir ekonomi botu altyapısı paylaştım</p>

<h2>Kurulum</h2> 

<p>Öncelikle /lib/Base/config.js dosyasını doldurmanız gerekiyor, ilk önce botun tokenini ve çalışacağı sunucunun id sini 4 ve 5. satırlardaki configlere yazıyoruz</p>

![image](https://cdn.discordapp.com/attachments/392407913140060190/1009098338609660054/token_ve_sunucu_id.png) <br>

<p>2. olarak ise botun "Top Coin" sıralamasının olacağı kanalı ve mesajı ayarlıyorsunuz, 39. satırdaki kanala configi 40. satırdaki kanala ise mesaj id sini yazmalısınız ( mesajı eval komudu ile yazdırmanız gerekmektedir(görünüşü ektedir))</p> 

![image](https://cdn.discordapp.com/attachments/392407913140060190/1009101355006312539/topmessage2.png)
![image](https://cdn.discordapp.com/attachments/392407913140060190/1009100396188422244/top_message.png) <br>

<p>3. olarak kanalları ayarlıyoruz, 43. satıra sohbet kanalımızın id sini 44. kanala ise market sisteminin logunun tutulcağı kanalın id sini yazıyoruz.</p>

![image](https://cdn.discordapp.com/attachments/392407913140060190/1009101647240245409/Ekran_goruntusu_2022-08-16_170913.png) <br>

<p>4. olarak ise ödül olarak verilecek coinleri ekliyoruz, 47. satıra tahmin oyununun ödülünü 48. satıra ise boost basmanın ödülünü yazıyoruz.</p>

![image](https://cdn.discordapp.com/attachments/392407913140060190/1009102986024337518/rewards.png) <br>

<p>5. olarak 51. satırda coin ekle/çıkar komudunu kullanabilcek kişileri belirliyoruz 1 kişi eklemek için["id"] 1 den fazla kişi eklemek için ["id1", "id2"] şeklinde yazabilirsiniz</p>

![image](https://cdn.discordapp.com/attachments/392407913140060190/1009103689052602480/ekleckar.png) <br>

<p>6. olarak duruma göre rol verme sistemini kuracağız ( mesela durumunuz wandal.tech olduğunda bot size x rolünü veriyor ), bunun için 54. satıra verilcek rolün id sini 55. satıra ise durum ne olursa rolün verileceğini yazıyoruz</p>

![image](https://cdn.discordapp.com/attachments/392407913140060190/1009105706215026739/durumrol.png)
