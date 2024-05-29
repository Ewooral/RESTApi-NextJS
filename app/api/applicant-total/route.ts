import {query} from '@/lib/connectToPostgres'
import { stat } from 'fs'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET() {
    let count
    try {
      const res = await query('SELECT COUNT(*) from users WHERE role = $1', ['Applicant'])
      console.log(res.rows[0].count)
      count = res.rows[0].count
    } catch(e) {
      console.error('Theres being an error:', e)
      return new Response(JSON.stringify({ error: e }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      })
    }
  
    return new Response(JSON.stringify({res: count}), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  }
