import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  date: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  tags: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  profileImage: string;
  email: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface FooterInfo {
  text: string;
  links: { name: string; url: string }[];
}

interface DataContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  blogPosts: BlogPost[];
  certificates: Certificate[];
  footerInfo: FooterInfo;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateProjects: (projects: Project[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateCertificates: (certificates: Certificate[]) => void;
  updateFooterInfo: (footer: FooterInfo) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addCertificate: (certificate: Certificate) => void;
  deleteCertificate: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultPersonalInfo: PersonalInfo = {
  name: 'Pushpa Koirala',
  title: 'Automation & Electrical Engineering Student | Cybersecurity Expert',
  bio: 'Passionate automation and electrical engineering student with expertise in cybersecurity. I love building innovative solutions and exploring the intersection of hardware and software security.',
  skills: ['Cybersecurity', 'Automation Engineering', 'Electrical Engineering', 'Python', 'Network Security', 'IoT Security', 'React', 'Node.js'],
  profileImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
  email: 'pushpa@example.com',
  location: 'Jyvaskyla, Finland',
  githubUrl: 'https://github.com/itzpushpa1715',
  linkedinUrl: 'https://www.linkedin.com/in/pushpakoirala/'
};

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Cybersecurity Automation Framework',
    description: 'Advanced security automation framework for threat detection and response',
    longDescription: 'A comprehensive cybersecurity automation framework that combines machine learning algorithms with traditional security tools to provide real-time threat detection and automated response capabilities.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['Cybersecurity', 'Python', 'Machine Learning', 'Automation'],
    githubUrl: 'https://github.com/itzpushpa1715',
    date: '2024-01-15',
    slug: 'cybersecurity-automation-framework'
  },
  {
    id: '2',
    title: 'IoT Security Monitor',
    description: 'Real-time monitoring system for IoT device security',
    longDescription: 'An intelligent IoT security monitoring system that analyzes network traffic, device behavior, and security vulnerabilities in real-time to protect IoT ecosystems.',
    image: 'https://images.pexels.com/photos/159613/ghettoblaster-radio-recorder-boombox-159613.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/159613/ghettoblaster-radio-recorder-boombox-159613.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['IoT', 'Security', 'Network Analysis', 'Python'],
    githubUrl: 'https://github.com/itzpushpa1715',
    liveUrl: 'https://example.com',
    date: '2023-11-20',
    slug: 'iot-security-monitor'
  }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Cybersecurity in IoT',
    content: `# The Future of Cybersecurity in IoT

The Internet of Things (IoT) has revolutionized how we interact with technology, but it has also introduced new security challenges that require innovative solutions.

## Key Challenges

1. **Device Proliferation**: With billions of IoT devices connected to networks worldwide, the attack surface has expanded exponentially.

2. **Resource Constraints**: Many IoT devices have limited computational power and memory, making traditional security measures impractical.

3. **Update Mechanisms**: Unlike traditional computers, IoT devices often lack robust update mechanisms, leaving them vulnerable to newly discovered threats.

## Solutions and Best Practices

### 1. Zero Trust Architecture
Implementing a zero trust model where every device and user is verified before accessing network resources.

### 2. Edge Computing Security
Processing data closer to the source reduces exposure and improves response times.

### 3. AI-Powered Threat Detection
Machine learning algorithms can identify anomalous behavior patterns that might indicate security breaches.

## Conclusion

The future of IoT security lies in combining traditional security principles with innovative approaches tailored to the unique challenges of IoT environments.`,
    excerpt: 'Exploring the evolving landscape of cybersecurity in the Internet of Things era and the innovative solutions needed to address emerging threats.',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2024-01-10',
    slug: 'future-of-cybersecurity-in-iot',
    tags: ['Cybersecurity', 'IoT', 'Technology', 'Security']
  }
];

const defaultCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: '2023-08-15',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=600',
    credentialUrl: 'https://example.com/certificate'
  },
  {
    id: '2',
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: '2023-06-20',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
    credentialUrl: 'https://example.com/certificate'
  }
];

const defaultFooterInfo: FooterInfo = {
  text: '© 2024 Pushpa Koirala. All rights reserved.',
  links: [
    { name: 'Privacy Policy', url: '/privacy' },
    { name: 'Terms of Service', url: '/terms' }
  ]
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem('personalInfo');
    return saved ? JSON.parse(saved) : defaultPersonalInfo;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : defaultBlogPosts;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('certificates');
    return saved ? JSON.parse(saved) : defaultCertificates;
  });

  const [footerInfo, setFooterInfo] = useState<FooterInfo>(() => {
    const saved = localStorage.getItem('footerInfo');
    return saved ? JSON.parse(saved) : defaultFooterInfo;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('footerInfo', JSON.stringify(footerInfo));
  }, [footerInfo]);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info);
  };

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const updateBlogPosts = (posts: BlogPost[]) => {
    setBlogPosts(posts);
  };

  const updateCertificates = (newCertificates: Certificate[]) => {
    setCertificates(newCertificates);
  };

  const updateFooterInfo = (footer: FooterInfo) => {
    setFooterInfo(footer);
  };

  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [...prev, post]);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  const addCertificate = (certificate: Certificate) => {
    setCertificates(prev => [...prev, certificate]);
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  return (
    <DataContext.Provider value={{
      personalInfo,
      projects,
      blogPosts,
      certificates,
      footerInfo,
      updatePersonalInfo,
      updateProjects,
      updateBlogPosts,
      updateCertificates,
      updateFooterInfo,
      addProject,
      deleteProject,
      addBlogPost,
      deleteBlogPost,
      addCertificate,
      deleteCertificate
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};