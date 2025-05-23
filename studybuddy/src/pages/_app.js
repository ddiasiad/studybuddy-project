import "@/styles/globals.css";
import { DM_Serif_Display, Poppins, Anton } from 'next/font/google'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
})

const anton = Anton({
    subsets: ['latin'],
    weight: '400', // Anton only has 400 weight
    variable: '--font-anton', // optional: for CSS variable usage
})

export default function App({ Component, pageProps }) {
  return (
      <main className={`${dmSerif.variable} ${poppins.variable} ${anton.variable}`}>
        <Component {...pageProps} />
      </main>
  )
}
