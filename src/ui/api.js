'use client';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL + '/api/v1'

export default axios.create({
  baseURL: API,
});
