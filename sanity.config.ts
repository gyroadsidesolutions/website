import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Documentos fijos que quedan protegidos contra borrado accidental
const singletonTypes = new Set(['heroSettings', 'aboutSettings', 'serviceImages']);

export default defineConfig({
  name: 'default',
  title: 'GY Roadside Solutions — Panel',
  projectId: '02066cqd',
  dataset: 'production',
  basePath: '/admin',

  // Bloqueo de seguridad: elimina las acciones de borrar, despublicar y duplicar
  document: {
    actions: (prev, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return prev.filter((originalAction) => {
          const actionName = originalAction.action;
          return actionName ? !['delete', 'unpublish', 'duplicate'].includes(actionName) : true;
        });
      }
      return prev;
    },
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // 1. Foto de Portada Principal (Hero) - Acceso directo único
            S.listItem()
              .title('🚛 Foto de Portada (Hero)')
              .id('heroSettingsSingleton')
              .child(
                S.document()
                  .schemaType('heroSettings')
                  .documentId('heroSettingsDocument')
              ),

            // 2. Foto Sección Sobre Nosotros / Equipo - Acceso directo único
            S.listItem()
              .title('👥 Foto Sobre Nosotros (About)')
              .id('aboutSettingsSingleton')
              .child(
                S.document()
                  .schemaType('aboutSettings')
                  .documentId('aboutSettingsDocument')
              ),

            // 3. Fotos Oficiales de Servicios - Acceso directo único
            S.listItem()
              .title('🛠️ Fotos de Servicios Principales')
              .id('serviceImagesSingleton')
              .child(
                S.document()
                  .schemaType('serviceImages')
                  .documentId('serviceImagesDocument')
              ),

            // 4. Galería de Trabajos en Carretera (múltiples fotos)
            S.documentTypeListItem('gallery').title('📸 Fotos de Trabajos (Galería)'),
          ]),
    }),
  ],
  schema: {
    types: [
      {
        name: 'heroSettings',
        title: 'Foto de Portada Principal (Hero)',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Identificador',
            type: 'string',
            initialValue: 'Foto Principal del Hero',
            readOnly: true,
            hidden: true,
          },
          {
            name: 'image',
            title: 'Foto Principal de Portada',
            description: 'Sube la foto horizontal (16:9). El sistema la optimiza y recorta automáticamente para teléfonos.',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      },
      {
        name: 'aboutSettings',
        title: 'Foto Sobre Nosotros',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Identificador',
            type: 'string',
            initialValue: 'Foto Sección Sobre Nosotros',
            readOnly: true,
            hidden: true,
          },
          {
            name: 'image',
            title: 'Foto del Equipo / Sobre Nosotros',
            description: 'Sube la foto del equipo o camión de servicio para la sección Nosotros. Cuenta con ajuste de punto focal (Hotspot).',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        ],
      },
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
