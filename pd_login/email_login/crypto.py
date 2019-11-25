import datetime
import base64
import random
from Crypto import Random
from Crypto.Cipher import AES


KEY_BYTES = 16
pad = lambda raw: bytes(raw + (KEY_BYTES - len(raw) % KEY_BYTES) * chr(KEY_BYTES - len(raw) % KEY_BYTES), 'utf-8')
unpad = lambda raw: raw[0:-ord(raw[-1:])]

now = datetime.datetime.now()
PLAIN_TEXT = 'Linuxwares_Authenticate_SINCE_{year}_PUDDLR_ENCRYPT_KEY_{month}'.format(year=now.year, month=now.strftime('%m%d'))


def generate_salt():
    _CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+="
    _chars = []
    for i in range(16):
        _chars.append(random.choice(_CHARSET))
    _salt = "".join(_chars)

    return _salt


class AESCipher:

    def __init__(self, key=None):
        if key == None:
            self.key = bytes(generate_salt(), 'utf-8')
        else:
            self.key = bytes(key, 'utf-8')


    def encrypt(self, raw=None):
        if raw == None:
            raw = PLAIN_TEXT
        raw = pad(raw)
        iv = Random.new().read(AES.block_size)             # initial vector
        cipher = AES.new(key=self.key, mode=AES.MODE_CBC, IV=iv)
        token = base64.b64encode(iv + cipher.encrypt(raw))
        out = {
            # 'iv': base64.b64encode(iv),
            'salt': self.key,
            'token': token
        }
        return out


    def decrypt(self, salt, token):
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(key=self.key, mode=AES.MODE_CBC, IV=iv)
        return unpad(cipher.decrypt(enc[16:])).decode('utf8')


# For test
if __name__ == '__main__':
    salt = generate_salt()
    test = AESCipher(salt)
    out = test.encrypt(PLAIN_TEXT)
    print(out)

