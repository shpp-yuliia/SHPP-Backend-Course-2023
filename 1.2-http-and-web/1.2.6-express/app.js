import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import ejs from 'ejs'
import path from "path"
import { fileURLToPath } from 'url'
import * as url from "url";
import getUriVisitsAmount from "./utils/get-uri-visits-amount.js";

dotenv.config({path: './env-files/.env'})

const { PORT}= process.env

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))

const uri_list_file = './statistics/url_list.txt'

app.use((req, res, next) => {
    const { originalUrl } = req
    const past_statistics = fs.readFileSync(uri_list_file)

    fs.writeFileSync(uri_list_file, `${past_statistics}\n${originalUrl} - ${new Date().toGMTString()}`)

    const url_visits_amount = getUriVisitsAmount(originalUrl, fs.readFileSync(uri_list_file, {encoding: 'utf8'}))

    if (originalUrl.match(/^\/statistics(\/)?$/gm)) {
        next()
    }

    if (!(originalUrl.match(/^\/statistics(\/)?$/gm))) {
        res.render('default.ejs', { url_visits_amount})
    }
})

app.use('/statistics', (req, res, next) => {

    const url_list = fs
        .readFileSync(uri_list_file, {encoding: 'utf8'})
        .split('\n')
        .filter(url => url !== '')
        .map(url => url.split(' - '))

    res.render('statistics.ejs', { url_list })
})

app.listen(PORT, () => {
    console.log(`The server was launched at https://localhost:${PORT}`)
})