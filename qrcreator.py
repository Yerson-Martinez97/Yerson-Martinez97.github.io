import qrcode
input = "https://vivebuenavista.netlify.app/"
qr = qrcode.QRCode(version=1,box_size=10,border=5)
qr.add_data(input)
qr.make(fit=True)
img = qr.make_image(fill='black',back_color='white')
img.save('qr/qrlandingpage.png')