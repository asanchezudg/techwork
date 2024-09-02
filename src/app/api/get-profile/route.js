// app/api/get-profile/route.js

import { query } from '../../../app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email no proporcionado' }, { status: 400 });
    }

    // Consultar la base de datos para obtener la información del usuario
    const userResult = await query('SELECT * FROM Users WHERE email = ?', [email]);

    if (userResult.length === 0) {
      return NextResponse.json({ success: false, message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Consultar la tabla UserCVs para obtener el nombre del archivo cargado
    const cvResult = await query('SELECT file_name FROM UserCVs WHERE email = ?', [email]);

    let fileUrl = null;
    if (cvResult.length > 0) {
      const fileName = cvResult[0].file_name;

      // Intentar construir la URL usando el primer host
      try {
        //const host = 'https://techwork-delta.vercel.app';
        const host = 'http://localhost:3000'; // Host de producción
        fileUrl = `${host}/mi-cuenta-/uploads/${fileName}`;
        // Simular acceso al host para verificar si es accesible (esto no es necesario en la mayoría de los casos)
      } catch (error) {
        // Si hay un error, usar el host alternativo
        const fallbackHost = 'http://localhost:3000'; // Host de desarrollo
        fileUrl = `${fallbackHost}/mi-cuenta/uploads/${fileName}`;
      }
    }

    return NextResponse.json({
      success: true,
      data: { ...userResult[0], cvUrl: fileUrl }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Error al obtener el perfil del usuario', error: error.message },
      { status: 500 }
    );
  }
}

