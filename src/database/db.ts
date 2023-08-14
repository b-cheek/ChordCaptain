import PocketBase from 'pocketbase'
import { DATABASE_URL } from '@/applicationConstants'

const pb = new PocketBase(DATABASE_URL)

export default pb
