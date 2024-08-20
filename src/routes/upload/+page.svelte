<script>
	import PhotoUpload from '$lib/components/photo-upload/PhotoUpload.svelte';
</script>

<section class="flex flex-col gap-4">
	<section class="flex flex-col items-center gap-6">
		<p
			class="bg-white bg-opacity-50 backdrop-blur-md text-lg text-center p-4 rounded-md shadow-md text-millbrook-900"
		>
			Podziel się swoim własnym spojrzeniem na wyjątkowy dzień w życiu <b>Anny</b> i <b>Jakuba</b> –
			dodaj do Księgi Gości swoje kadry ze świętowania ich zaślubin.
		</p>
		<PhotoUpload action="?/upload-photo" />

		<PhotoUpload action="?/upload-photo" captureNew={true} />
	</section>
</section>
<section class="flex flex-col gap-4">
	<section class="flex flex-col items-center gap-6">
		<p
			class="bg-white bg-opacity-50 backdrop-blur-md text-lg text-center p-4 rounded-md shadow-md text-millbrook-900"
		>
		Mam dla Was ważną informację dotyczącą zdjęć z tego wyjątkowego dnia. Niestety, z powodu problemów technicznych z naszego dostawcy usług hostingowych, część zdjęć mogła nie zostać zapisana poprawnie.
		<br>W związku z tym, chciałbym Was serdecznie poprosić o ponowne przesłanie wszystkich zdjęć, które udało się Wam zachować. Rozumiem, że to może być dodatkowy kłopot, ale każda fotografia jest dla nas bardzo cenna i chcemy mieć pewność, że wszystko zostanie prawidłowo zarchiwizowane.
		<br>Dodaliśmy również nową funkcjonalność, która umożliwia przesyłanie wielu zdjęć jednocześnie, aby cały proces był szybszy i łatwiejszy.
		<br>Bardzo przepraszam za wszelkie niedogodności i dziękuję za Waszą cierpliwość. Jeśli potrzebujecie pomocy lub macie pytania, nie wahajcie się skontaktować ze mną bezpośrednio.
		<br>Wszystkie potrzebne przyciski do przesyłania zdjęć znajdziecie powyżej.
		<br>Serdecznie pozdrawiam,
		<br>Andrzej Lippa
		</p>
	</section>
</section>