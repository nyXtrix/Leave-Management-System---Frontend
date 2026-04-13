import HomeLayout from '@/components/layout/HomeLayout'
import React from 'react'
import ContactManagement from '@/features/contact/ContactManagement'

const ContactPage = () => {
  return (
    <div className="animate-reveal">
       <ContactManagement/>
    </div>
  )
}

export default ContactPage