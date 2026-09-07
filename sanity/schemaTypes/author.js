export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'role', title: 'Role / Department', type: 'string' },
    { name: 'image', title: 'Photograph', type: 'image', options: { hotspot: true } },
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
}
