import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'GY Roadside Solutions — Panel',
  projectId: '02066cqd',
  dataset: 'production',
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'gallery',
        title: 'Fotos de Trabajos',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Título del Trabajo / Servicio',
            type: 'string',
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'date',
            title: 'Fecha',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
          },
          {
            name: 'image',
            title: 'Foto del Trabajo',
            type: 'image',
            options: {
              hotspot: true,
            },
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Detalles (Ubicación, tipo de vehículo, etc.)',
            type: 'text',
          },
        ],
      },
    ],
  },
});
