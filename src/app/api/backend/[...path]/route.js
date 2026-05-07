import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_BASE_URL = 'https://infinity-club.onrender.com/api';
const TOKEN_COOKIE = 'infinity_token';
const ROLE_COOKIE = 'infinity_role';

function setSessionCookies(response, payload) {
  if (payload?.token) {
    response.cookies.set(TOKEN_COOKIE, payload.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }

  if (payload?.user?.role) {
    response.cookies.set(ROLE_COOKIE, payload.user.role, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }
}

function clearSessionCookies(response) {
  response.cookies.set(TOKEN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  response.cookies.set(ROLE_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

async function proxy(request, { params }) {
  const path = Array.isArray(params?.path) ? params.path.join('/') : '';
  const url = `${BACKEND_BASE_URL}/${path}${request.nextUrl.search}`;
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('content-type', contentType);
  }
  headers.set('accept', 'application/json');

  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  const init = { method: request.method, headers };

  if (!['GET', 'HEAD'].includes(request.method)) {
    init.body = await request.arrayBuffer();
  }

  const backendResponse = await fetch(url, init);
  const responseContentType = backendResponse.headers.get('content-type') || '';
  let payload;

  if (responseContentType.includes('application/json')) {
    payload = await backendResponse.json();
  } else {
    payload = await backendResponse.text();
  }

  const response = responseContentType.includes('application/json')
    ? NextResponse.json(payload, { status: backendResponse.status })
    : new NextResponse(payload, {
        status: backendResponse.status,
        headers: responseContentType ? { 'content-type': responseContentType } : undefined,
      });

  if (path.includes('auth/login') || path.includes('auth/register') || path.endsWith('/user') || path === 'user') {
    setSessionCookies(response, payload);
  }

  if (path.includes('auth/logout') || backendResponse.status === 401) {
    clearSessionCookies(response);
  }

  return response;
}

export async function GET(request, context) {
  return proxy(request, context);
}

export async function POST(request, context) {
  return proxy(request, context);
}

export async function PUT(request, context) {
  return proxy(request, context);
}

export async function PATCH(request, context) {
  return proxy(request, context);
}

export async function DELETE(request, context) {
  return proxy(request, context);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
