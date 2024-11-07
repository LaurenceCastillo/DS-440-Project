import pandas as pd
from bs4 import BeautifulSoup
import asyncio
from pyppeteer import launch

headers = { #define user agent for web browser
    'User-Agent' : 'MumenRider'
}

def parse(content): #Take in HTML content to turn into "soup" from which we can attain desired objects.
    soup = BeautifulSoup(content, 'html.parser')

    