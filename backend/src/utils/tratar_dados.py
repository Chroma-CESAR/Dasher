import re

def tratar_dados(data):

    data = str(data).lower()  
    data = re.sub(r"[.,-]", " ", data)  
    data = re.sub(r"[^a-z\s]", "", data) 
    data = re.sub(r"\s+", " ", data)  
    data = data.strip()  
    return data