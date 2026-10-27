import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'GY Roadside Solutions — Panel',
  projectId: '02066cqd',
  dataset: 'production',
  basePath: '/admin',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // 1. Galería de Trabajos (permite múltiples fotos)
            S.documentTypeListItem('gallery').title('📸 Fotos de Trabajos (Galería)'),
            
            // 2. Fotos Oficiales de Servicios (abre directo el documento único, sin botón de crear duplicados)
            S.listItem()
              .title('🛠️ Fotos de Servicios Principales')
              .id('serviceImagesSingleton')
              .child(
                S.document()
                  .schemaType('serviceImages')
                  .documentId('serviceImagesDocument')
              ),
          ]),
    }),
  ],
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
      {
        name: 'serviceImages',
        title: 'Fotos de Servicios Principales',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Identificador',
            type: 'string',
            initialValue: 'Fotos Oficiales de Servicios',
            readOnly: true,
            hidden: true,
          },
          {
            name: 'tireChange',
            title: '1. Neumáticos (Tire Change & Repair)',
            description: 'Foto real para el servicio de cambio de neumáticos y ponchaduras.',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'reeferMaintenance',
            title: '2. Unidades Reefer (Reefer Maintenance & Repair)',
            description: 'Foto real trabajando en la unidad o sistema de refrigeración.',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'fuelDelivery',
            title: '3. Entrega de Combustible (Fuel Delivery)',
            description: 'Foto real suministrando diésel o combustible en carretera.',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'jumpStart',
            title: '4. Batería y Corriente (Jump Start & Battery)',
            description: 'Foto real pasando corriente o cambiando baterías de camión.',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'oilChange',
            title: '5. Cambio de Aceite (Oil Change)',
            description: 'Foto real de cambio de aceite y filtros de motor.',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'brakeService',
            title: '6. Inspección y Reparación de Frenos (Brake Service)',
            description: 'Foto real inspeccionando balatas, cámaras de aire o frenos.',
            type: 'image',
            options: { hotspot: true },
          },
        ],
      },
    ],
  },
});
