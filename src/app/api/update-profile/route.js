// app/api/update-profile/route.js

import { query } from '../../../app/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const email = formData.get('email');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const middleName = formData.get('middleName');
    const address = formData.get('address');
    const country = formData.get('country');
    const state = formData.get('state');
    const file = formData.get('cv');

    // Validar que el email esté presente
    if (!email) {
      return NextResponse.json({ success: false, message: 'El email es requerido' }, { status: 400 });
    }

    // Actualizar información del usuario en la tabla Users por email
    await query(
      'UPDATE Users SET firstName = ?, lastName = ?, middleName = ?, address = ?, country = ?, state = ? WHERE email = ?',
      [firstName, lastName, middleName, address, country, state, email]
    );

    let cvPath = null;

    // Manejar la carga del CV si se proporcionó un archivo
    if (file && file.size > 0) { // Verificar que el archivo no esté vacío
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${file.name}`;
      const filePath = join(process.cwd(), 'src','app','mi-cuenta', 'uploads', fileName);

      // Guardar el archivo en el sistema de archivos
      await writeFile(filePath, buffer);
      cvPath = `../../mi-cuenta/uploads/${fileName}`;

      // Verificar si ya existe un CV para este usuario utilizando el email
      const existingCV = await query('SELECT id FROM UserCVs WHERE email = ?', [email]);

      if (existingCV.length > 0) {
        // Actualizar el CV existente
        await query(
          'UPDATE UserCVs SET file_name = ?, file_path = ? WHERE email = ?',
          [fileName, cvPath, email]
        );
      } else {
        // Insertar un nuevo CV
        await query(
          'INSERT INTO UserCVs (email, file_name, file_path) VALUES (?, ?, ?)',
          [email, fileName, cvPath]
        );
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Perfil actualizado exitosamente',
      cvPath: cvPath 
    });

  } catch (error) {
    console.error('Error updating profile:', error);

    // Proporcionar un mensaje de error detallado
    return NextResponse.json(
      { success: false, message: 'Error al actualizar el perfil. Detalles del error: ' + error.message },
      { status: 500 }
    );
  }
}
